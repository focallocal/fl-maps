import React, { Component } from 'react'
import { Navbar, Nav, Alert, Button, FormGroup, Label, Input } from 'reactstrap'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { rolesDataKey, checkPermissions } from './RolesPermissions/index'
import AdminTable from './AdminTable/index'
import PostsView from './PostsView/index'
import MergeUsersModal from './MergeUsersModal/index'
import './style.scss'
import UserSearch from './UserSearch/index'
import UserDisplay from './UserDisplay/index'
import { parseData } from  './AdminTable/helper'

class Admin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      currentUserDisplay: { role: '', name: '' },
      events: [],
      limit: 25,
      skip: 0,
      isNoMoreUsers: false,
      alertNotAuthorized: false,
      isSearching: false,
      isAllEvents: false,
      showPostsView: false,
      userSortBy: 'alphabetical', // 'alphabetical', 'mostPosts', 'joinDateNewest', 'joinDateOldest'
      syncingUsers: false,
      showMergeModal: false,
      eventsLoading: false

    }
  }

  componentDidMount () {
    checkPermissions('adminPage').then((isPermision) => {
      if (!isPermision) { //!
        this.props.history.goBack()//!
      }//!
      else { //!

        this.displayCurrentUser(this.props.currentUser)
        this.getUsers()
      }/// !
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.users !== prevState.users && prevState.users) {
      this.getEvents()
    }
  }

  changeUserRole = (e, id) => {
    const role = e.target.value
    checkPermissions('changeRole').then((isPermision) => {
      if (!isPermision) { //!
        this.setState({ alertNotAuthorized: true })//! 
      }//!
      else { //!
        handleChangeUserRole(role, id, this)
      }//!

    })

    function handleChangeUserRole (role, id, context) {
      Meteor.call('Admin.changeRole', { id, role }, (err, res) => {
        if (err) {
          throw new Meteor.Error('could not change user')
        }
        context.setState(currentState => {
          let users = [...currentState.users]
          const index = users.findIndex((ele) => {
            return ele._id === id
          })
          const roles = { [rolesDataKey]: [role] }
          users[index].roles = roles
          return {
            users
          }
        })
      })
    }
  }

  deleteUser = (id) => {
    checkPermissions('deleteUser').then((isPermision) => {
      if (!isPermision) {
        this.setState({ alertNotAuthorized: true })
      } else {
        handledeleteUser(this)
      }
    })

    function handledeleteUser (context) {
      Meteor.call('Admin.deleteUser', { id }, (err, res) => {
        if (err) {
          throw new Meteor.Error('could not change delete')
        }
        context.setState(currentState => {
          let userData = [...currentState.users]
          const index = userData.findIndex((ele) => {
            return ele._id === id
          })
          userData.splice(index, 1)
          return {
            users: userData
          }
        })
      })
    }
  }

  displayMoreUsers = () => {
    let { skip, limit } = this.state
    skip = skip + limit
    let stateToSet = { skip }
    if (this.state.isSearching === true) {
      // For reseting if users was previously searching
      stateToSet.users = []
      stateToSet.isSearching = false
      stateToSet.skip = 0
    }
    this.setState(stateToSet, () => {
      this.getUsers()
    })
  }

  getUsers = () => {
    const { skip, limit } = this.state
    Meteor.call('Admin.getUsers', { skip, limit }, (err, res) => {
      if (err) {
        console.error('Error fetching users:', err)
        this.setState({ users: [] })
        return
      }

      if (!res) {
        console.error('getUsers returned undefined')
        this.setState({ users: [] })
        return
      }

      if (res && res.length > 0) {
        this.setState(currentState => {
          res = this.nameOnly(res)
          const users = currentState.users.concat(res)
          return { users }
        })
      } else {
        this.setState({ isNoMoreUsers: true })
      }
    })
  }

  getEvents = () => {
    this.setState({ eventsLoading: true })
    // Fetch ALL events, not just for visible users
    Meteor.call('Admin.getPosts', { searchQuery: '', searchFilter: 'title', sortBy: 'dateNewest' }, (err, res) => {
      if (err) {
        this.setState({ eventsLoading: false })
        throw new Meteor.Error('could not load events: ' + err.message)
      }
      this.setState({ events: (res && res.posts) || [], eventsLoading: false })
    })
  }

  addRoles = (id, role) => {
    Meteor.call('Admin.addRoles', { id, role }, (err, res) => {
      if (err) {
        throw new Meteor.Error('could not find user...')
      }
    })
  }

  searchForUser = (userToFind) => {
    const changeToFoundUsers = (ele) => {
      this.setState(currentState => {
        let users = currentState.users.slice(currentState.users.length)
        ele = this.nameOnly(ele)
        users = users.concat(ele)
        return { users, isSearching: true }
      })
    }

    searchDatabase(userToFind).then(ele => {
      changeToFoundUsers(ele)
    }).catch(e => {
      throw new Meteor.Error('no user')
    })

    function searchDatabase (profileName) {
      const foundUser = new Promise((resolve, reject) => {
        Meteor.call('Admin.searchUsers', { profileName }, (err, res) => {
          if (err) {
            reject(err)
            throw new Meteor.Error('could not grant action')
          }
          resolve(res)
        })
      })
      return foundUser
    }
  }

  handleToggleEvents =() => {
    this.setState({ isAllEvents: !this.state.isAllEvents })
  }

  handleToggleView = () => {
    this.setState({ showPostsView: !this.state.showPostsView })
  }

  handleSyncDiscourseUsers = () => {
    if (!window.confirm('Sync all Discourse users? This may take a few minutes.')) {
      return;
    }

    this.setState({ syncingUsers: true });
    
    Meteor.call('Admin.syncDiscourseUsers', (error, result) => {
      this.setState({ syncingUsers: false });
      
      if (error) {
        alert(`Error syncing users: ${error.message}`);
      } else {
        alert(`Sync complete!\nTotal: ${result.totalSynced}\nCreated: ${result.totalCreated}\nUpdated: ${result.totalUpdated}`);
        // Reload users after sync
        this.setState({ users: [], skip: 0, isNoMoreUsers: false }, () => {
          this.getUsers();
        });
      }
    });
  }

  handleUserSortChange = (e) => {
    this.setState({ userSortBy: e.target.value });
  }

  toggleMergeModal = () => {
    this.setState({ showMergeModal: !this.state.showMergeModal });
  }

  handleToggleView = () => {
    const willShowPostsView = !this.state.showPostsView;
    this.setState({ showPostsView: willShowPostsView });
    
    // Ensure events are loaded when switching to PostsView
    if (willShowPostsView && this.state.users.length > 0 && !this.state.events) {
      this.getEvents();
    }
  }

  handleMergeComplete = () => {
    // Refresh user list and events after merge
    this.setState({ skip: 0, users: [], events: [] }, () => {
      this.getUsers();
      // getEvents() will be called by componentDidUpdate when users update
    });
  }

  getSortedUsers () {
    const { users, userSortBy, events } = this.state
    if (!users || !Array.isArray(users)) {
      return []
    }
    const usersCopy = [...users]

    switch (userSortBy) {
      case 'alphabetical':
        return usersCopy.sort((a, b) => {
          const nameA = parseData('user', a).toLowerCase()
          const nameB = parseData('user', b).toLowerCase()
          return nameA.localeCompare(nameB)
        })
      
      case 'mostPosts':
        // Count events for each user
        const userEventCounts = {}
        if (events && Array.isArray(events)) {
          events.forEach(event => {
            const userId = event.organiser?._id
            if (userId) {
              userEventCounts[userId] = (userEventCounts[userId] || 0) + 1
            }
          })
        }
        return usersCopy.sort((a, b) => {
          const countA = userEventCounts[a._id] || 0
          const countB = userEventCounts[b._id] || 0
          return countB - countA
        })
      
      case 'joinDateNewest':
        return usersCopy.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0)
          const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0)
          return dateB - dateA
        })
      
      case 'joinDateOldest':
        return usersCopy.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0)
          const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0)
          return dateA - dateB
        })
      
      default:
        return usersCopy
    }
  }

  deleteAllEvents = (eventIds) => {
    const handleDeleteEvent = () => {
      const remainingEvents = this.state.events.filter(ele => {
        return eventIds.indexOf(ele._id) === -1
      })
      const resetDefault = () => {
        this.setState({ events: remainingEvents })
      }
      Meteor.call('Admin.deleteAllEvents', { eventIds }, (err, res) => {
        if (err) {
          throw new Meteor.Error('could not grant action')
        } else {
          resetDefault()
        }
      })
    }

    checkPermissions('deleteEditResource').then((isPermision) => {
      if (!isPermision) {
        this.setState({ alertNotAuthorized: true })
      } else {
        handleDeleteEvent()
      }
    })
  }

  displayCurrentUser (currentUser) {
    let name = parseData('user', currentUser)
    let role = parseData('role', currentUser)[0]
    name = this.nameOnly([name])
    const currentUserDisplay = { name, role }
    this.setState({ currentUserDisplay })
  }

  nameOnly = (users) => {
    for (let index = 0, length = users.length; index < length; index++) {
      let name
      if (typeof users[index] === 'object') {
        name = parseData('user', users[index])
        name = name.split('@')
        users[index].profile.name = name[0]
      } else {
        users = users[index].split('@')[0]
      }
    }
    return users
  }

  render () {
    const { isNoMoreUsers, events, eventsLoading, alertNotAuthorized, currentUserDisplay, showPostsView, userSortBy, syncingUsers, showMergeModal } = this.state

    let isNoUsersFound = this.state.users.length <= 0
    const sortedUsers = this.getSortedUsers()
    
    return (
      <div id="admin">
        <UserDisplay name={currentUserDisplay.name} role={currentUserDisplay.role}/>
        <div className="admin-controls">
          <div className="admin-controls-header">
            <div className="left-controls">
              <Button 
                color="warning" 
                onClick={this.toggleMergeModal}
                className="merge-users-btn"
              >
                Merge Users FL-Maps
              </Button>
            </div>
            <div className="right-controls">
              <Button 
                color="info" 
                onClick={this.handleSyncDiscourseUsers}
                disabled={syncingUsers}
                className="sync-users-btn"
              >
                {syncingUsers ? 'Syncing...' : 'Sync Discourse Users'}
              </Button>
            </div>
          </div>
          <div className="admin-controls-row">
            <div className="toggle-wrapper">
              <Button color="primary" onClick={this.handleToggleView} className="view-toggle-btn">
                {showPostsView ? 'Show Users View' : 'Show Posts View'}
              </Button>
            </div>
            {!showPostsView && (
              <>
                <div className="user-search-wrapper">
                  <UserSearch searchForUser={this.searchForUser} />
                </div>
                <div className="admin-sort-wrapper">
                  <FormGroup className="sort-users">
                    <Label for="userSortSelect">Sort by:</Label>
                    <Input
                      type="select"
                      id="userSortSelect"
                      value={userSortBy}
                      onChange={this.handleUserSortChange}
                    >
                      <option value="alphabetical">Alphabetical</option>
                      <option value="mostPosts">Most Posts</option>
                      <option value="joinDateNewest">Join Date (Newest)</option>
                      <option value="joinDateOldest">Join Date (Oldest)</option>
                    </Input>
                  </FormGroup>
                </div>
              </>
            )}
          </div>
        </div>
        {showPostsView ? (
          eventsLoading ? (
            <div className='admin-container'>
              <p>Loading events...</p>
            </div>
          ) : (
            <PostsView events={events || []} users={this.state.users} onDeletePosts={this.getEvents} onToggleView={this.handleToggleView} />
          )
        ) : (
          <>
            {isNoUsersFound &&
              <Alert color="secondary">No Users found</Alert>
            }
            <AdminTable deleteUser={this.deleteUser} users={sortedUsers} deleteAllEvents={this.deleteAllEvents}
              isAllEvents={this.state.isAllEvents} changeUserRole={this.changeUserRole} events={events}/>
            <Button onClick={this.displayMoreUsers} >More</Button>
            {isNoMoreUsers &&
              <Alert color="secondary">No More Users</Alert>
            }
          </>
        )}
        {alertNotAuthorized &&
          <Alert color="secondary">Not Authorized</Alert>
        }
        <MergeUsersModal 
          isOpen={showMergeModal} 
          toggle={this.toggleMergeModal}
          users={this.state.users}
          onMergeComplete={this.handleMergeComplete}
        />
      </div>
    )
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user()
  }
})(Admin)

export {
  Admin
}

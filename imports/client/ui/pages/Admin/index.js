import React, { Component, Fragment } from "react";
//import { Roles } from 'meteor/alanning:roles';
import { Navbar, Nav, Alert , Button } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import {rolesDataKey, checkPermissions } from "./RolesPermissions/index"
import AdminTable from "./AdminTable/index"
import './style.scss'
import UserSearch from './UserSearch/UserSearch'


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      users : [],
      currentUser: {},
      events: [],
      limit: 25,
      skip: 0,
      isNoMoreUsers: false,
      alertNotAuthorized : false,
      isSearching: false,
 
      }
     }
  
  componentDidMount(){
    checkPermissions('adminPage').then((isPermision) => {

      // if (!isPermision) {//!
      //   this.props.history.goBack()//!
      // }//!
    
      this.getUsers();
    });
  }

  componentDidUpdate(prevProps,prevState){
    if (this.state.users !== prevState.users && prevState.users){
      this.getEvents();
    }
 
    if (prevProps.currentUser !== this.props.currentUser) {
      this.setState({ currentUser: this.props.currentUser });
    }
  }

  changeUserRole = (e, id) => {
    const role = e.target.value;
    
    checkPermissions('changeRole').then((isPermision) => {        

      // if (!isPermision) {//!
      //   this.setState({ alertNotAuthorized: true });//!
      // }//!
      // else{//!
        handleChangeUserRole(role, id, this);
      // }//!
      
    });

    function handleChangeUserRole(role,id,context) {
      Meteor.call('Admin.changeRole', { id, role }, (err, res) => {
        if (err) {
          throw new Meteor.Error('could not change user')
        }
        context.setState(currentState => {
          let users = [...currentState.users]
          const index = users.findIndex((ele) => {
            return ele._id === id;
          })
          const roles = { [rolesDataKey]: [role] }
          users[index].roles = roles;
          return {
            users
          }
        });
      })
    }
  }

  deleteUser = (id) => {
    checkPermissions('deleteUser').then((isPermision) => {
      if (!isPermision) {
        this.setState({ alertNotAuthorized:  true});
      }
      else{
        handledeleteUser(this);
      }
  });

    function handledeleteUser(context) {
      Meteor.call('Admin.deleteUser', { id }, (err, res) => {
        if (err) {

          throw new Meteor.Error('could not change delete')
        }
        context.setState(currentState => {
          let userData = [...currentState.users];
          const index = userData.findIndex((ele) => {
            return ele._id === id;
          })
          userData.splice(index, 1);
          return {
            users : userData
          }
        });
      })
    }
  }

  displayMoreUsers = () =>{
    let { skip, limit } = this.state;
    skip = skip + limit;
    let stateToSet = {skip}
    if (this.state.isSearching === true){
      //For reseting if users was previously searching
      stateToSet.users = []
      stateToSet.isSearching = false;
      stateToSet.skip = 0;
    }
    this.setState(stateToSet,()=>{
      this.getUsers()
    });
  }

  getUsers = () =>{
    const {skip, limit} = this.state;
    Meteor.call('Admin.getUsers', { skip, limit} , (err, res) => {
      if (err) {
        throw new Meteor.Error('could not find user...')
      }

      if (res && res.length > 0) {
        this.setState(currentState => {
          res = this.nameOnly(res);
          const users = currentState.users.concat(res);
          return { users}
        });
      }
      else{
        this.setState({ isNoMoreUsers: true });
      }
    })
  }

  getEvents = () => {
    const {users} = this.state;
    let result = users.map(e => e._id);
    Meteor.call('Admin.getEvents', { ids: result}, (err, res) => {
      if (err) {
        throw new Meteor.Error('could not find user...')
      }
      this.setState({ events: res });
    })
  }

  addRoles = (id, role) =>{
    Meteor.call('Admin.addRoles', { id, role}, (err, res) => {
      if (err) {
        throw new Meteor.Error('could not find user...')
      }
    })
  }

  searchForUser = (userToFind) => {
    const changeToFoundUsers = (ele) => {
      this.setState(currentState => {
        let users = currentState.users.slice(currentState.users.length);
        ele = this.nameOnly(ele);
        users = users.concat(ele);
        return { users, isSearching: true }
      });
    }

    searchDatabase(userToFind).then(ele => {
      changeToFoundUsers(ele);
    }).catch(e=> {
      throw new Meteor.Error('no user')
    })

    function searchDatabase(profileName){
      const foundUser = new Promise ((resolve, reject) => {
        Meteor.call('Admin.searchUsers', { profileName }, (err, res) => {
          if (err) {
            reject(err);
            throw new Meteor.Error('could not grant action')
          }
          resolve(res);
        })
      })
      return foundUser
    }
   
  }

  nameOnly = (users) => { 
    for (let index = 0, length = users.length; index < length; index++) {
     let name = users[index].profile.name;
      name = name.split('@');
      users[index].profile.name = name[0];
      
    }
    return users
  }

  render() {
    const { isNoMoreUsers, events, alertNotAuthorized} = this.state;
    let isNoUsersFound = this.state.users.length <= 0 ? true: false
    return ( 
      <div id="admin">
        <UserSearch searchForUser={this.searchForUser}/>
        {isNoUsersFound && <Alert color="secondary">No Users found</Alert>
        }
        <AdminTable deleteUser={this.deleteUser} users={this.state.users} changeUserRole={this.changeUserRole} events={events}/>
        <Button onClick={this.displayMoreUsers}>More</Button> 
        {isNoMoreUsers && <Alert color="secondary">No More Users</Alert>
        }
        {alertNotAuthorized && <Alert color="secondary">
          Not Authorized
        </Alert>
        }
      </div>
     )
  }
}
 
export default withTracker(() => {
  return {
    currentUser: Meteor.user()
  };

})(Admin);

export {
  Admin
};

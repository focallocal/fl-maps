import React, { Component, Fragment } from "react";
import { Roles } from 'meteor/alanning:roles';
import { Navbar, Nav, Alert , Button } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import {rolesDataKey, checkPermissions } from "./RolesPermissions/index"
import AdminTable from "./AdminTable/index"

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
      }
     }
  
  componentDidMount(){
    this.getUsers();
  }

  componentDidUpdate(prevProps,prevState){
    if (this.state.users !== prevState.users && prevState.users){
     // do a component should update on this
      this.getEvents();
    }
 
    if (prevProps.currentUser !== this.props.currentUser) {
      this.setState({ currentUser: this.props.currentUser });
    }

    if (prevState.currentUser !== this.state.currentUser && this.state.currentUser){    
      checkPermissions('adminPage').then((isPermision)=>{    

          // if (!isPermision){
          //   this.props.history.goBack() 
          //  }

        });
    }
  }

  changeUserRole = (e, id) => {
   const role = e.target.value;
    handleChangeUserRole(role, id,this);
    checkPermissions('changeRole').then((isPermision) => {

      // if (!isPermision) {
      //  this.setState({ alertNotAuthorized: true });
      // }

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
          console.log('err', err);
          throw new Meteor.Error('could not change delet')
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
    this.setState({skip},()=>{
      this.getUsers()
    });
  }

  getUsers = () =>{
    const {skip, limit} = this.state;
    Meteor.call('Admin.getUsers', { skip, limit} , (err, res) => {
      if (err) {
        console.error('error', err)
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
    return ( 
      <div>
        <AdminTable deleteUser={this.deleteUser} users={this.state.users} changeUserRole={this.changeUserRole} events={events}/>
        <Button onClick={this.displayMoreUsers}>More</Button> 
        {isNoMoreUsers && <Alert color="secondary">
          No More Users
        </Alert>
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
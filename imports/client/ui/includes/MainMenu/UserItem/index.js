import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import React from "react"
import DropDownItem from "../DropDownItem"
import i18n from "/imports/both/i18n/en"
import { Roles } from 'meteor/alanning:roles'
import { permissions} from './../../../pages/Admin/RolesPermissions/index'
const UserItem = ({ user }) => {
  let userStatus;
  let isShowAdminLink = false;
  if (user){
    isShowAdminLink = Roles.userIsInRole(user._id, permissions['adminPage'])
    console.log('isShowAdminLink', isShowAdminLink);
  }
  if (isShowAdminLink) {
    userStatus = 'Admin'
  }
  else {
    userStatus = user ? "loggedIn" : "loggedOut";
  }
  const item = {
    'title': '',
    'icon': 'fas fa-user-circle user',
    'content': i18n.MainMenu.userLink[userStatus]
  }

  return (
    <DropDownItem item={item} id='user-item' />
  )
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  }
})(UserItem)

// For testing
export {
  UserItem
}

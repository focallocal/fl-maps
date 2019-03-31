import React from "react";
import DropDownItem from "../DropDownItem";

import i18n from "/imports/both/i18n/en";
//import admin from './../../../../utils/adminControl';
const UserItem = ({ user }) => {
  // add check for specific email for initial admin setup
 
  //console.log('user', user._id);

  // if (user.admin === true) {
  //   userStatus = 'Admin'
  // }
  // else {
  //   userStatus = user ? "loggedIn" : "loggedOut";
  // }
  const userStatus = user ? "loggedIn" : "loggedOut";
  const item = {
    title: "",
    icon: "fas fa-user-circle user",
    content: i18n.MainMenu.userLink[userStatus]
  };

  return <DropDownItem item={item} id="user-item" />;
};

export default UserItem;

// For testing
export { UserItem };

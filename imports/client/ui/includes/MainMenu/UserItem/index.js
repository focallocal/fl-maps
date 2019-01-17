import React from "react";
import DropDownItem from "../DropDownItem";

import i18n from "/imports/both/i18n/en";

const UserItem = ({ user }) => {
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

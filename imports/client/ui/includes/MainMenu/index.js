import React, { Component, Fragment } from "react";
import { Navbar, Nav, NavItem, Button } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import Sidebar from "./Sidebar";
import DropDownItem from "./DropDownItem";
import LinkItem from "./LinkItem";
import UserItem from "./UserItem";
import Logo from "./Logo";
import i18n from "/imports/both/i18n/en";
import "./styles.scss";

class MainMenu extends Component {
  state = {
    sidebarOpen: false
  };

  render() {
    const { sidebarOpen } = this.state;
    const { user } = this.props;

    const { MainMenu } = i18n;

    return (
      <Fragment>
        <Navbar id="main-menu" expand="md">
          {/* Left Links */}
          <Logo />
          <NavItem id="sidebar-toggle" onClick={this.toggleSidebar}>
            <i className="fas fa-bars" />
          </NavItem>

          {/* Right Links  */}
          <Nav id="menu-items">
            {MainMenu.leftLinks.map((link, index) => {
              const isDropDown = !!link.content;
              if (user || !link.loginRequired) {
                return isDropDown ? (
                  <DropDownItem key={index} item={link} />
                ) : (
                  <LinkItem key={index} item={link} />
                );
              }
            })}
          </Nav>
          <Nav id="right-links">
            <NavItem id="add-event">
              <RouterNavLink to="?new=1">
                <Button>{MainMenu.addEvent}</Button>
              </RouterNavLink>
            </NavItem>
            <UserItem user={user} />
          </Nav>
        </Navbar>

        <Sidebar
          isOpen={sidebarOpen}
          i18nFile={MainMenu}
          toggle={this.toggleSidebar}
          user={user}
        />
      </Fragment>
    );
  }

  toggleSidebar = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  };
}

export default withTracker(() => {
  return { user: Meteor.user() };
})(MainMenu);

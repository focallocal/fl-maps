import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Nav } from "reactstrap";
import Swipeable from "react-swipeable";
import Category from "./Category";
import LinkItem from "../LinkItem";
import Logo from "../Logo";
import "./styles.scss";

class Sidebar extends Component {
  state = {
    isOpen: false,
    i18nFile: null
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps;
  }

  componentDidMount() {
    document.addEventListener("click", this.toggleSidebarFromOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.toggleSidebarFromOutside);
  }

  render() {
    const { isOpen, i18nFile } = this.state;

    const { toggle, user } = this.props;

    const className = isOpen ? "--open" : "";

    return (
      <Fragment>
        <Swipeable id="sidebar" className={className} onSwipedLeft={toggle}>
          <header>
            <i className="fas fa-bars" onClick={toggle} />
            <Logo sidebar onClick={toggle} />
          </header>

          <Nav vertical>
            <div className="items-from-i18n">
              {i18nFile.leftLinks.map((link, index) => {
                const isDropDown = !!link.content;
                if (user || !link.loginRequired) {
                  return isDropDown ? (
                    <Category key={index} item={link} onClick={toggle} />
                  ) : (
                    <LinkItem key={index} item={link} onClick={toggle} />
                  );
                }
              })}
            </div>
          </Nav>
        </Swipeable>
        <div id="sidebar-backdrop" className={isOpen ? "--show" : ""} />
      </Fragment>
    );
  }

  toggleSidebarFromOutside = ({ target }) => {
    // when sidebar is opened, the #sidebar-backdrop element is covering the whole screen
    // so clicking outside the sidebar should match only that element.

    if (target.id === "sidebar-backdrop") {
      this.props.toggle();
    }
  };
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  i18nFile: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired
};

export default Sidebar;

import React, { Component } from 'react'
import { Navbar, Nav, NavbarBrand, NavItem } from 'reactstrap'
import { NavLink as RouterNavLink } from 'react-router-dom'
import DropDownItem from './DropDownItem'
import LinkItem from './LinkItem'
import UserItem from './UserItem'
import i18n from '/imports/both/i18n/en'
import './styles.scss'

class MainMenu extends Component {
  render () {
    const { MainMenu } = i18n

    return (
      <Navbar id='main-menu' expand='md'>

        {/* Left Links */}
        <Nav id='left-links'>

          {/* Logo */}
          <NavbarBrand id='brand-logo' tag='div'>
            <RouterNavLink to='/' exact>Focallocal</RouterNavLink>
          </NavbarBrand>

          {MainMenu.leftLinks.map((link, index) => {
            const isDropDown = !!link.content

            return isDropDown
              ? <DropDownItem key={index} item={link} />
              : <LinkItem key={index} item={link} />
          })}
        </Nav>

        {/* Right Links  */}
        <Nav id='right-links'>
          {/* {MainMenu.rightLinks.map((link, index) => {
            return (
              <LinkItem key={index} item={link} />
            )
          })} */}
          <NavItem>
            <RouterNavLink to='/map' className='nav-link'>
              <i className='fa fa-globe map' />
            </RouterNavLink>
          </NavItem>
          <NavItem>
            <RouterNavLink to='/map?new=1' className='nav-link'>
              <i className='fas fa-plus add' />
            </RouterNavLink>
          </NavItem>
          <UserItem />
        </Nav>
      </Navbar>
    )
  }
}

export default MainMenu

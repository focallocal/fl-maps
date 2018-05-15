import React from 'react'
import { NavItem, NavLink } from 'reactstrap'
import { NavLink as RouterNavLink } from 'react-router-dom'

const LinkItem = ({ item }) => {
  // Distingiush between link and route-link
  const isRouteLink = !!item.route

  return isRouteLink ? (
    <NavItem>
      <RouterNavLink to={item.route} exact className='nav-link'>
        <i className={item.icon}></i>
        <div>{item.title}</div>
      </RouterNavLink>
    </NavItem>
  ) :
    <NavItem>
      <NavLink href={item.link} target='__blank'>
        <i className={item.icon}></i>
        <div>{item.title}</div>
      </NavLink>
    </NavItem>
}

export default LinkItem

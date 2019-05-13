import React from 'react'
import PropTypes from 'prop-types'
import { NavItem, NavLink } from 'reactstrap'
import { NavLink as RouterNavLink } from 'react-router-dom'

const LinkItem = ({ item, onClick }) => {
  // Distingiush between link and route-link
  const isRouteLink = !!item.route

  return isRouteLink ? (
    <NavItem onClick={onClick}>
      <RouterNavLink to={item.route} exact className='nav-link'>
        <i className={item.icon}></i>
        <div>{item.title}</div>
      </RouterNavLink>
    </NavItem>
  )
    : <NavItem>
      <NavLink href={item.link} target={item.targetSelf ? '_self' : '_blank'}>
        <i className={item.icon}></i>
        <div>{item.title}</div>
      </NavLink>
    </NavItem>
}

LinkItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func
}

export default LinkItem

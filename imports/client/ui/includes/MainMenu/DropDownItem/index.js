import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class DropDownItem extends Component {
  state = {
    dropdownOpen: false
  }

  render () {
    const {
      item,
      id
    } = this.props

    const {
      dropdownOpen
    } = this.state

    return (
      <NavItem id={id}>
        <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>

          {/* Item (Toggler) */}
          <DropdownToggle nav>
            <FontAwesomeIcon icon={item.icon} className='fas' />
            <div>
              {item.title}
              <FontAwesomeIcon icon="fas fa-caret-down" className='fas fa-caret-down inline' />
            </div>
          </DropdownToggle>

          {/* Menu  */}
          <DropdownMenu>
            {item.content.map((item_, index) => {
              // Distingiush between link and route-link
              return item_.link
                ? <DropdownItem key={index} tag='a' href={item_.link} target={item_.targetSelf ? '_self' : '_blank'}>{item_.title}</DropdownItem>
                : <DropdownItem key={index} tag={NavLink} to={item_.route}>{item_.title}</DropdownItem>
            })}
          </DropdownMenu>

        </Dropdown>
      </NavItem>
    )
  }

  toggle = () => {
    this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }))
  }
}

DropDownItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default DropDownItem

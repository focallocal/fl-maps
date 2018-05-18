import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { NavLink } from 'react-router-dom'

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
            <i className={item.icon}></i>
            <div>
              {item.title}
              <i className='fas fa-caret-down inline' />
            </div>
          </DropdownToggle>

          {/* Menu  */}
          <DropdownMenu>
            {item.content.map((item_, index) => {

              // Distingiush between link and route-link
              return item_.link ?
                <DropdownItem key={index} tag='a' href={item_.link}>{item_.title}</DropdownItem>
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

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Nav } from 'reactstrap'
import Category from './Category'
import LinkItem from '../LinkItem'
import Logo from '../Logo'
import './styles.scss'

class Sidebar extends Component {
  state = {
    isOpen: false,
    i18nFile: null
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    return nextProps
  }

  componentDidMount () {
    document.addEventListener('click', this.toggleSidebarFromOutside)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.toggleSidebarFromOutside)
  }

  render () {
    const {
      isOpen,
      i18nFile
    } = this.state

    const {
      toggle
    } = this.props

    const className = isOpen ? '--open' : ''

    return (
      <Fragment>
        <div id='sidebar' className={className}>
          <header>
            <i className='fas fa-bars' onClick={toggle}></i>
            <Logo />
          </header>

          <Nav vertical>
            <LinkItem
              item={{ route: '/', icon: 'fas fa-home', title: 'Home' }}
              onClick={toggle}
            />

            <div className='items-from-i18n'>
              {i18nFile.leftLinks.map((link, index) => {
                const isDropDown = !!link.content

                return isDropDown
                  ? <Category key={index} item={link} />
                  : <LinkItem key={index} item={link} onClick={toggle} />
              })}
            </div>
          </Nav>
        </div>
        <div id='sidebar-backdrop' className={isOpen ? '--show' : ''} />
      </Fragment>
    )
  }

  toggleSidebarFromOutside = ({ target }) => {
    // when sidebar is opened, the #sidebar-backdrop element is covering the whole screen
    // so clicking outside the sidebar should match only that element.

    if (target.id === 'sidebar-backdrop') {
      this.props.toggle()
    }
  }
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  i18nFile: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired
}

export default Sidebar

import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { NavbarBrand } from 'reactstrap'
import './styles.scss'

const Logo = ({ sidebar, onClick }) => {
  let imgUrl
  let menuLogo

  if (window.__mapType !== 'gatherings') {
    imgUrl = sidebar ? 'btm_logo_invert.png' : 'btm_logo.png'
  } else {
    menuLogo = sidebar
      ? <a class="brand-logo brand-text-mobile" href="http://focallocal.org">Focallocal</a>
      : <a class="brand-logo brand-text" href="http://focallocal.org">Focallocal</a>
  }

  return (
    <NavbarBrand id='brand-logo' tag='div' onClick={onClick}>
      <NavLink to='/' exact>
        {
          window.__mapType === 'gatherings'
            ? menuLogo
            : <img src={'/images/' + imgUrl} />
        }
      </NavLink>
    </NavbarBrand>
  )
}

Logo.propTypes = {
  sidebar: PropTypes.bool,
  onClick: PropTypes.func
}

export default Logo

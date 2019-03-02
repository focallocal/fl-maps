import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { NavbarBrand } from 'reactstrap'
import './styles.scss'

const Logo = ({ sidebar, onClick }) => {
  let imgUrl

  if (window.__mapType === 'gatherings') {
    imgUrl = sidebar ? 'focallocal_logo_invert.png' : 'focallocal_logo.png'
  } else {
    imgUrl = sidebar ? 'btm_logo_invert.png' : 'btm_logo.png'
  }

  return (
    <NavbarBrand id='brand-logo' tag='div' onClick={onClick}>
      <NavLink to='/' exact>
        {
          window.__mapType === 'gatherings'
            ? <a class="brand-logo brand-text" href="http://focallocal.org">Focallocal</a>
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

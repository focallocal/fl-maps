import React from 'react'
import { NavLink } from 'react-router-dom'
import { NavbarBrand } from 'reactstrap'
import i18n from '/imports/both/i18n/en'
import './styles.scss'

const Logo = () => (
  <NavbarBrand id='brand-logo' tag='div'>
    <NavLink to='/' exact>{i18n.MainMenu.logo}</NavLink>
  </NavbarBrand>
)

export default Logo

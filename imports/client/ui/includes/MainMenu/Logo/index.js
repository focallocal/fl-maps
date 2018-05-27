import React from 'react'
import { NavLink } from 'react-router-dom'
import { NavbarBrand } from 'reactstrap'
import './styles.scss'

const Logo = () => (
  <NavbarBrand id='brand-logo' tag='div'>
    <NavLink to='/' exact>Focallocal</NavLink>
  </NavbarBrand>
)

export default Logo

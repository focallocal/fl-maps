// External Packages
import React, { Fragment } from 'react'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'

// Styles and Other
import './styles.scss'

const links = {
  Intro: '/whitepaper/intro',
  Why: '/whitepaper/why',
  FAQs: '/whitepaper/faqs',
  Team: '/team',
  Whitepaper: '/whitepaper'
}

const NavMenu = () => (
  <Fragment>
    <Container className="menu">
      {Object.keys(links).map(route => {
        return (
          <Link to={links[route]} key={route}>
            {route}
          </Link>
        )
      })}
    </Container>

    <div className="header-divider" />
  </Fragment>
)

export default NavMenu

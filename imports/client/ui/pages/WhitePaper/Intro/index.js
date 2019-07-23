// External Packages
import React, { Component } from 'react'
import { Container } from 'reactstrap'

// Componets
import TopImageSection from './TopImageSection'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import NavMenu from '../NavMenu'

// Styles and Other
import './style.scss'

class Intro extends Component {
  componentDidMount () {
    window.__setDocumentTitle('Intro')
  }

  render () {
    return (
      <div id="intro">
        <Container>
          <h2>Introduction</h2>
        </Container>
        <NavMenu />
        <TopImageSection />
        {/* <AboutSection button= {false} /> */}
        <FirstSection />
        <SecondSection />
      </div>
    );
  }
}

export default Intro

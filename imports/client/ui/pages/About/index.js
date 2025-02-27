import React, { Component } from 'react'
import TopImageSection from './TopImageSection'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import ThirdSection from './ThirdSection'
import AboutSection from '../Home/SecondSection'
import i18n from '/imports/both/i18n/en'
import './styles.scss'

class About extends Component {
  componentDidMount () {
    window.__setDocumentTitle('About')
  }

  render () {
    return (
      <div id='about'>
        <h2>About Us</h2>
        <div className='header-divider' />
        <TopImageSection />
        <AboutSection button= {false} />
        <FirstSection />
        <SecondSection />
        <ThirdSection />
      </div>
    )
  }
}

export default About

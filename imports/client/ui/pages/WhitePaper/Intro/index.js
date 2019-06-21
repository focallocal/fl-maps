import React, { Component } from 'react'
import TopImageSection from './TopImageSection'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
// import AboutSection from '../Home/SecondSection'
import i18n from '/imports/both/i18n/en/'
import './style.scss'

class Intro extends Component {
  componentDidMount () {
    window.__setDocumentTitle('Intro')
  }

  render () {

    return (
      <div id='intro'>
        <h2>Intro</h2>
        <div className='header-divider' />
        <TopImageSection />
        {/* <AboutSection button= {false} /> */}
        <FirstSection />
        <SecondSection />
      </div>
    )
  }
}

export default Intro

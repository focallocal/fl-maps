import React, { Component } from 'react'
import TopImageSection from './TopImageSection'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import AboutSection from '../Home/SecondSection'
import i18n from '/imports/both/i18n/en'
import './styles.scss'

class About extends Component {
  componentDidMount () {
    window.__setDocumentTitle('Template')
  }

  render () {

    return (
      <div id='Template'>
        <h2>Template Page</h2>
        <div className='header-divider' />
        <TopImageSection />
        <AboutSection button= {false} />
        <FirstSection />
        <SecondSection />
      </div>
    )
  }
}

export default Template
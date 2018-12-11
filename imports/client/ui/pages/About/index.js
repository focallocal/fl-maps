import React, { Component } from 'react'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import AboutSection from '../Home/SecondSection'
import i18n from '/imports/both/i18n/en'
import './styles.scss'

class About extends Component {
  componentDidMount () {
    window.__setDocumentTitle('About')
  }

  render () {
    const { content } = i18n.About.first_section
    const {top_image_url} = content

    return (
      <div id='about'>
        <h2>About Us</h2>
        <div className='header-divider' />
        <div className='top_image_div'>
          <img className='top_image' src={top_image_url}/>
        </div>
        <AboutSection button= {false} />
        <FirstSection />
        <SecondSection />
      </div>
    )
  }
}

export default About

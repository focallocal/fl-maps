import React, { Component } from 'react'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
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
        <FirstSection />
        <SecondSection />
      </div>
    )
  }
}

export default About

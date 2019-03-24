import React, { Component } from 'react'
import TopImageSection from './TopImageSection'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import AboutSection from '../Home/SecondSection'
import './styles.scss'

class About extends Component {
  constructor(props) {
    super()
    this.state = {
      data: window.cachedDataForPage,
      id: props.match.params.id,
      loaded: false,
      badges: null
    }
  }

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
      </div>
    )
  }
}

export default About
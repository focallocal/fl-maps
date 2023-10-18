import React, { Component } from 'react'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import HowToHelpSection from './HowToHelpSection'
import MovementSection from './MovementSection'
import ProjectsSection from './ProjectsSection'
import EventsSection from './EventsSection'
import './styles.scss'

class Home extends Component {
  componentDidMount () {
    window.__setDocumentTitle('Home')
  }

  render () {
    let url
    let opacity
    if (window.__mapType === 'gatherings') {
      url = '/images/PHM-logo-banner-text-high.svg'
      // opacity = 0.5
    } else {
      url = '/images/focallocal-bgOG.jpg'
    }
    let backgroundImage = { backgroundImage: 'url(' + url + ')', opacity }
    let imgStyle = { width: '100%' }
    return (
      <main className='home'>
        {/* <div id='hero-bg' style={backgroundImage} /> */}
        <div>
          <img src={url} style={imgStyle} />
        </div>
        <MovementSection />
        <ProjectsSection />
        <EventsSection />
        {/*
          <FirstSection />
          <HowToHelpSection />
          <SecondSection button/>
        */}
      </main>
    )
  }
}

export default Home
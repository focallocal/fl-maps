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
      url = '/images/Public-happiness-movement-new-banner-01.jpg'
      // opacity = 0.5
    } else {
      url = '/images/focallocal-bgOG.jpg'
    }
    let backgroundImage = { backgroundImage: 'url(' + url + ')', opacity }
    let imgStyle = { width: '100%' }

    let largeScreenStyle = `
      @media (min-width: 768px) {
        img {
          width: 60%; /* Adjust the percentage to your desired size */
        }
      }
    `;
    // Adjust the background color to match the sides of the image
    let containerStyle = {
      backgroundColor: '#f2f2f2', // Replace with the desired color
      display: 'flex',
      justifyContent: 'center',
    };
    return (
      <main className="home" style={containerStyle}>
        <style>{largeScreenStyle}</style>

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

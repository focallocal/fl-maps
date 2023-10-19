import React, { Component } from 'react';
import FirstSection from './FirstSection';
import SecondSection from './SecondSection';
import HowToHelpSection from './HowToHelpSection';
import MovementSection from './MovementSection';
import ProjectsSection from './ProjectsSection';
import EventsSection from './EventsSection';
import './styles.scss';

class Home extends Component {
  componentDidMount() {
    window.__setDocumentTitle('Home');
  }

  render() {
    let url;
    let opacity;
    let isMobile = window.innerWidth <= 768; // Define the threshold for mobile devices

    if (window.__mapType === 'gatherings') {
      if (isMobile) {
        url = '/images/PHM-logo-banner-low.jpg';
      } else {
        url = '/images/PHM-logo-banner-text-high.svg';
      }
    } else {
      url = '/images/focallocal-bgOG.jpg';
    }

    let backgroundImage = { backgroundImage: 'url(' + url + ')', opacity };
    let imgStyle = { width: '100%' };

    return (
      <main className='home'>
        {/* <div id='hero-bg' style={backgroundImage} /> */}
        <div>
          <img src={url} style={imgStyle} alt="Banner" />
        </div>
        <MovementSection />
        <ProjectsSection />
        <EventsSection />
        {/* Uncomment the following sections if needed */}
        {/* <FirstSection /> */}
        {/* <HowToHelpSection /> */}
        {/* <SecondSection button/> */}
      </main>
    );
  }
}

export default Home;

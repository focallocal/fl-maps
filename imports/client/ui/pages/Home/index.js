import React, { Component } from 'react';
import SlideshowBanner from '../../components/SlideBanner';
import EventsSection from './EventsSection';
import MovementSection from './MovementSection';
import ProjectsSection from './ProjectsSection';
import i18n from '/imports/both/i18n/en';
import './styles.scss';

// Default fallback images (PHM)
// To customize: Edit the background_image paths in your i18n home.json file
// Recommended dimensions: Desktop 1920x1080px, Mobile 750x1334px
const DEFAULT_BACKGROUND = {
  desktop: '/images/home-images/public_happiness_logo_main.png',
  mobile: '/images/PHM-logo-banner-low.jpg'
};

class Home extends Component {
  componentDidMount() {
    window.__setDocumentTitle('Home');
  }

  render() {
    const isMobile = window.innerWidth <= 768;
    
    // Get background image from i18n, with PHM fallback
    const backgroundConfig = i18n.Home.background_image || DEFAULT_BACKGROUND;
    const url = isMobile 
      ? (backgroundConfig.mobile || DEFAULT_BACKGROUND.mobile)
      : (backgroundConfig.desktop || DEFAULT_BACKGROUND.desktop);

    return (
      <main className='home'>
        <div className=''>
          <img src={url} alt="Banner" className='background-image' />
        </div>
        <SlideshowBanner autoScrollInterval={10000} />
        {/*
        <div className='banner-title'>
          <h3>Public Happiness</h3>
        </div>*/}
        
        <div className='' 
          style={{
            position: 'relative',
            textAlign: 'center',
            margin: '5% 0 0 0'
          }}
        >
          <img src='/images/home-images/phm_text_logo.png' alt="Banner" className='' 
            style={{
              maxWidth: '90%',
              height: 'auto',
            }}
          />
        </div>
        <EventsSection />
        <ProjectsSection />
        <MovementSection />
        {/* Uncomment the following sections if needed */}
        {/* <FirstSection /> */}
        {/* <HowToHelpSection /> */}
        {/* <SecondSection button/> */}
      </main>
    );
  }
}

export default Home;

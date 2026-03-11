// @ts-nocheck
import React, { Component } from 'react';
import SlideshowBanner from '../../components/SlideBanner';
import GettingStarted from './GettingStarted';
import PathwayCards from './PathwayCards';
import UpcomingAndNews from './UpcomingAndNews';
import ProjectBuilds from './ProjectBuilds';
import Leaderboards from './Leaderboards';
import i18n from '/imports/both/i18n/en';
import './styles.scss';

// Default fallback images (PHM)
const DEFAULT_BACKGROUND = {
  desktop: '/images/home-images/public_happiness_logo_main.png',
  mobile: '/images/PHM-logo-banner-low.jpg'
};

class NewHomepage extends Component {
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
      <main className='new-homepage'>
        {/* SVG sharpening filter - tightens edges on scaled PNGs */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <filter id="sharpen-edges">
              <feConvolveMatrix
                order="3"
                kernelMatrix="0 -0.5 0  -0.5 3 -0.5  0 -0.5 0"
                preserveAlpha="true"
              />
            </filter>
          </defs>
        </svg>
        
        {/* Section 1: Hero Banner (unchanged) */}
        <div className='hero-section'>
          <img src={url} alt="Banner" className='background-image' />
        </div>
        
        <SlideshowBanner autoScrollInterval={10000} />
        
        {/* Section 2: Site Title (unchanged) */}
        <div className='site-title-section'>
          <img 
            src='/images/home-images/phm_text_logo.png' 
            alt="Public Happiness Movement" 
            className='site-title-logo'
          />
        </div>

        {/* Section 3: Getting Started - 1 column with 3 overflow boxes */}
        <GettingStarted />

        {/* Section 4: Pathways - Gatherings (Local) & Projects (Global) */}
        <PathwayCards />

        {/* Section 5: Upcoming Gatherings + Latest News - 2 columns */}
        <UpcomingAndNews />

        {/* Section 6: Current Project Builds - 3 columns */}
        <ProjectBuilds />

        {/* Section 7: Leaderboards - 2 column grid */}
        <Leaderboards />
      </main>
    );
  }
}

export default NewHomepage;

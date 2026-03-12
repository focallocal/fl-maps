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
        {/* SVG filter: smooth anti-aliased edge border that fades into the bubble */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <filter id="smooth-bubble-edge" x="-2%" y="-2%" width="104%" height="104%">
              {/* Step 1: Create a smoothly blurred version of the full image */}
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="smoothed"/>
              {/* Step 2: Erode the alpha channel inward to create an interior-only mask */}
              <feMorphology in="SourceAlpha" operator="erode" radius="2" result="inner-mask"/>
              {/* Step 3: Cut the sharp original to only the interior (no jagged edges) */}
              <feComposite in="SourceGraphic" in2="inner-mask" operator="in" result="crisp-center"/>
              {/* Step 4: Layer crisp center over smooth edges - edges show the blurred color-matched border */}
              <feComposite in="crisp-center" in2="smoothed" operator="over"/>
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

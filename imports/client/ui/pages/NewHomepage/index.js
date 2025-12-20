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

// Breakpoint must match $breakpoint-md in styles.scss
const MOBILE_BREAKPOINT = 768;

class NewHomepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.__setDocumentTitle('Home');
    window.addEventListener('resize', this.handleResize);
    // Check on mount in case SSR value was different
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    if (isMobile !== this.state.isMobile) {
      this.setState({ isMobile });
    }
  }

  render() {
    const { isMobile } = this.state;
    
    // Get background image from i18n, with PHM fallback
    const backgroundConfig = i18n.Home.background_image || DEFAULT_BACKGROUND;
    const url = isMobile 
      ? (backgroundConfig.mobile || DEFAULT_BACKGROUND.mobile)
      : (backgroundConfig.desktop || DEFAULT_BACKGROUND.desktop);

    return (
      <main className={`new-homepage ${isMobile ? 'is-mobile' : ''}`}>
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

import React, { Component } from 'react';
// import FloatingSlider from '../../components/FloatingSlider';
import { Tracker } from "meteor/tracker";
import SlideshowBanner from '../../components/SlideBanner';
import EventsSection from './EventsSection';
import MovementSection from './MovementSection';
import ProjectsSection from './ProjectsSection';
import './styles.scss';

// Make website mobile responsive.
Tracker.autorun(() => {

  // Add or update the viewport meta tag
  const metaViewport = document.querySelector("meta[name='viewport']");
  if (!metaViewport) {
    const newMetaViewport = document.createElement("meta");
    newMetaViewport.setAttribute("name", "viewport");
    newMetaViewport.setAttribute("content", "width=device-width, initial-scale=1.0");
    document.head.appendChild(newMetaViewport);
  } else {
    metaViewport.setAttribute("content", "width=device-width, initial-scale=1.0");
  }

  // Update the title
  document.title = "Dynamic Page Title";
});

class Home extends Component {
  componentDidMount() {
    window.__setDocumentTitle('Home');
  }

  render() {
    let url;
    // let opacity;
    let isMobile = window.innerWidth <= 768; // Define the threshold for mobile devices

    if (window.__mapType === 'gatherings') {
      if (isMobile) {
        url = '/images/PHM-logo-banner-low.jpg'; // Mobile hero image
      } else {
        url = '/images/home-images/public_happiness_logo_main.png'; // Desktop hero image
      }
    } else if (window.__mapType === 'btm') {
      if (isMobile) {
        url = '/images/focallocal-bgOG.jpg'; // Mobile hero image
      } else {
        url = '/images/focallocal-bgOG.jpg'; // Desktop hero image
      }
    } else if (window.__mapType === 'climate') {
      if (isMobile) {
        url = '/images/climate.jpg'; // Mobile hero image
      } else {
        url = '/images/climate.jpg'; // Desktop hero image
      }
    } else if (window.__mapType === 'wiggles') {
      if (isMobile) {
        url = '/images/wiggles.jpg'; // Mobile hero image
      } else {
        url = '/images/wiggles.jpg'; // Desktop hero image
      }
    }

    // let backgroundImage = { backgroundImage: 'url(' + url + ')', opacity };
    /*let imgStyle = { 
      width: '100%',
      height: '100vh',
      objectFit: 'cover',
      position: 'fixed',
      top: 0,
      left: 0,
    };*/

    const images = [
      '/images/home-images/slide-images/andy_the_liberators.png',
      '/images/home-images/slide-images/bubbles_cover.png',
      '/images/home-images/slide-images/andy_pillow.png',
      '/images/home-images/slide-images/andy_happy_cow.png',
      '/images/home-images/slide-images/temp2.png',
    ];
    return (
      <main className='home'>
        {/* <div id='hero-bg' style={backgroundImage} /> */}
        {/*
        <div className=''>
          <img src={url} alt="Banner" className='mobile-banner' />
        </div>*/}
        <div className=''>
          <img src={url} alt="Banner" className='background-image' />
        </div>
        <SlideshowBanner images={images} autoScrollInterval={3000} />
        {/*<FloatingSlider />*/}
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

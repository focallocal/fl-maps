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
    if (window.__mapType === 'gatherings') {
      url = '/images/Public-happiness-movement-new-banner-01.jpg';
      // opacity = 0.5
    } else {
      url = '/images/focallocal-bgOG.jpg';
    }
    let backgroundImage = {
      backgroundImage: `url(${url})`,
      opacity,
      backgroundAttachment: 'fixed',
    };
    let imgStyle = { width: '100%' };

    let largeScreenStyle = `
      @media (min-width: 768px) {
        .home {
          position: relative;
          overflow: hidden;
        }
        .spacer {
          height: 4em;
        }
        .background-image {
          position: fixed;
          top: 4em;
          left: 0;
          width: 100%;
          height: calc(100% - 4em);
          background-size: cover;
          background-position: center;
          z-index: -1;
        }
        .home-content {
          position: relative;
          padding-top: 30vh;
          text-align: center;
          z-index: 1;
        }
      }
    `;

    return (
      <main className="home">
        <style>{largeScreenStyle}</style>
        <div className="spacer"></div>
        <div className="background-image" style={backgroundImage}></div>
        <div className="home-content">
          <MovementSection />
          <ProjectsSection />
          <EventsSection />
          {/* Add the other content sections here */}
        </div>
      </main>
    );
  }
}

export default Home;

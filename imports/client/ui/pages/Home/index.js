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
    let backgroundImage = { backgroundImage: `url(${url})`, opacity };
    let imgStyle = { width: '100%' };

    let largeScreenStyle = `
      @media (min-width: 768px) {
        .home {
          position: relative;
        }
        .background-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background-size: cover;
          background-position: center;
          z-index: 0;
        }
        .home-content {
          position: relative;
          padding-top: 50vh;
          text-align: center;
        }
      }
    `;

    return (
      <main className="home">
        <style>{largeScreenStyle}</style>
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

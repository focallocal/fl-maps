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
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
    let imgStyle = { width: '100%' };

    let largeScreenStyle = `
      @media (min-width: 768px) {
        .home {
          position: relative;
          overflow: hidden;
        }
        .background-image {
          display: none;
        }
        .home-content {
          position: relative;
          padding-top: 30vh;
          text-align: center;
        }
      }
    `;

    return (
      <main className="home">
        <style>{largeScreenStyle}</style>
        <div className="background-image" style={backgroundImage}></div>
        <div className="home-content">
          <div style={{ height: '100vh' }}>
            <div style={backgroundImage}></div>
          </div>
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

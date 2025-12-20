// @ts-nocheck
import React, { useState } from 'react';
import i18n from '/imports/both/i18n/en';

const GettingStarted = () => {
  const content = i18n.NewHomepage?.getting_started || {};
  const guides = content.guides || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? guides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === guides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="getting-started-section">
      <div className="getting-started-container">
        <div className="getting-started-content">
          <h2 className="getting-started-title">{content.title || 'Get Started'}</h2>
          <p className="getting-started-text">{content.description}</p>
          <a href={content.see_all_url} className="see-all-btn">
            {content.see_all_btn || 'See All Guides'}
          </a>
        </div>
        
        {/* Desktop: Show all 3 boxes */}
        <div className="getting-started-boxes desktop-only">
          {guides.map((guide, index) => (
            <a 
              key={index} 
              href={guide.url} 
              className="guide-box"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src={guide.image || '/images/home-images/PHM-logo-banner-text-mid.svg'} 
                alt={guide.title} 
                className="guide-image"
                onError={(e) => {
                  if (!e.target.dataset.fallback) {
                    e.target.dataset.fallback = 'true';
                    e.target.src = '/images/home-images/PHM-logo-banner-text-mid.svg';
                  }
                }}
              />
              <div className="guide-content">
                <h3 className="guide-title">{guide.title}</h3>
                <p className="guide-description">{guide.description}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile: Carousel with one box at a time */}
        <div className="getting-started-carousel mobile-only">
          <button className="carousel-arrow prev" onClick={goToPrevious}>
            &#10094;
          </button>
          
          <a 
            href={guides[currentIndex]?.url} 
            className="guide-box"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img 
              src={guides[currentIndex]?.image || '/images/home-images/PHM-logo-banner-text-mid.svg'} 
              alt={guides[currentIndex]?.title} 
              className="guide-image"
              onError={(e) => {
                if (!e.target.dataset.fallback) {
                  e.target.dataset.fallback = 'true';
                  e.target.src = '/images/home-images/PHM-logo-banner-text-mid.svg';
                }
              }}
            />
            <div className="guide-content">
              <h3 className="guide-title">{guides[currentIndex]?.title}</h3>
              <p className="guide-description">{guides[currentIndex]?.description}</p>
            </div>
          </a>
          
          <button className="carousel-arrow next" onClick={goToNext}>
            &#10095;
          </button>
          
          {/* Dots indicator */}
          <div className="carousel-dots">
            {guides.map((_, index) => (
              <span 
                key={index} 
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GettingStarted;

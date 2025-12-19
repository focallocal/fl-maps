// @ts-nocheck
import React from 'react';
import i18n from '/imports/both/i18n/en';

const GettingStarted = () => {
  const content = i18n.NewHomepage?.getting_started || {};
  const guides = content.guides || [];

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
        
        <div className="getting-started-boxes">
          {guides.map((guide, index) => (
            <a 
              key={index} 
              href={guide.url} 
              className="guide-box"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src={guide.image} 
                alt={guide.title} 
                className="guide-image"
                onError={(e) => {
                  // Prevent infinite loop if placeholder also fails
                  if (!e.target.dataset.fallback) {
                    e.target.dataset.fallback = 'true';
                    e.target.src = '/images/home-images/placeholder.jpg';
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
      </div>
    </section>
  );
};

export default GettingStarted;

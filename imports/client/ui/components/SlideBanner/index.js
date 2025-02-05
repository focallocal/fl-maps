import React, { useEffect, useState } from 'react';
import './styles.scss'; // Ensure you have corresponding styles
import i18n from '/imports/both/i18n/en';

const SlideshowBanner = ({ autoScrollInterval = 3000 }) => {
  const SlideBannerI18N = i18n.Home.slide_banner_section;

  const {
    items
  } = SlideBannerI18N

  console.log(items);

  // Get random initial index
  const getRandomIndex = () => Math.floor(Math.random() * items.length);
  const [currentIndex, setCurrentIndex] = useState(getRandomIndex());
  const [isHovered, setIsHovered] = useState(false);

  // Go to previous image
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  // Go to next image
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };

  // Auto scroll logic, stops when hovered
  useEffect(() => {
    if (isHovered) return; // Don't run auto scroll when hovered

    const interval = setInterval(goToNext, autoScrollInterval);
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [currentIndex, autoScrollInterval, isHovered]);

  return (
    <div
      className="slideshow-container"
      onMouseEnter={() => setIsHovered(true)} // Pause on hover
      onMouseLeave={() => setIsHovered(false)} // Resume on mouse leave
    >
      <div className="slideshow-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {items.map((item, index) => (
          <div className="slideshow-slide" key={index}>
            <div className='desktop-slide-header-container'>
              <h5 className='desktop-slide-header'>{item.header}</h5>
            </div>
            <img src={item.image} alt={`Slide ${index + 1}`} className="slide-image" />
            <div>
              <div className='mobile-slide-header'>{item.header}</div>
              <div className='slide-sub-header-container'>
                <p className='slide-sub-header'>{item.sub_header}</p>
              </div>
              <div className='slide-cta'>
                <a 
                  href={item.cta_link}
                  className='btn btn-primary'
                >{item.cta}</a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="prev-button" onClick={goToPrevious}>
        &#10094;
      </button>
      <button className="next-button" onClick={goToNext}>
        &#10095;
      </button>
    </div>
  );
};

export default SlideshowBanner;
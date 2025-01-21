import React, { useEffect, useState } from 'react';
import './styles.scss'; // Ensure you have corresponding styles

const SlideshowBanner = ({ images, autoScrollInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Go to previous image
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Go to next image
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
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
        {images.map((image, index) => (
          <div className="slideshow-slide" key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className="slide-image" />
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
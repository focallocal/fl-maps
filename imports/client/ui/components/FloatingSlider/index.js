import React, { useEffect, useState } from "react";
import "./styles.scss";

const FloatingSlider = () => {
  const [randomImages, setRandomImages] = useState([]);

  // List of image paths
  const imagePaths = [
    '/images/focallocal-bgOG.jpg',
    '/images/cover_climate_hack.png',
    '/images/PHM-logo-banner-text-high.svg'
    // Add all your image file names here
  ];


  useEffect(() => {
    // Randomize images on reload
    const numImages = 5; // Number of floating images to show
    const selectedImages = Array.from({ length: numImages }, () =>
      imagePaths[Math.floor(Math.random() * imagePaths.length)]
    );
    setRandomImages(selectedImages);
  }, []); // Run this once when the component loads

  return (
    <div className="hero-container">
      <div className="hero-text">Welcome to My Hero Banner</div>
      {randomImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Floating ${index}`}
          className="floating-image"
        />
      ))}
    </div>
  );
};

export default FloatingSlider;

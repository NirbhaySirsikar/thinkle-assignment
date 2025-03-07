import React, { useState, useEffect } from "react";
import "../../styles/Login.css";
import loginImg1 from "../../assets/images/login-img-1.webp";
import loginImg2 from "../../assets/images/login-img-2.webp";
import loginImg3 from "../../assets/images/login-img-3.webp";
import loginImg4 from "../../assets/images/login-img-4.webp";

const images = [
    loginImg1,
    loginImg2,
    loginImg3,
    loginImg4,
];

const LoginCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(3); // Start with the last image as previous
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const slideTimer = setTimeout(() => {
      setIsSliding(true);
      setPreviousIndex(currentIndex);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      
      // Reset sliding state after animation completes
      const animationTimer = setTimeout(() => {
        setIsSliding(false);
      }, 600); // Match this with CSS transition duration
      
      return () => clearTimeout(animationTimer);
    }, 3000);

    return () => clearTimeout(slideTimer);
  }, [currentIndex]);

  return (
    <div className="login-carousel">
      {images.map((image, index) => (
        <div
          key={index}
          className={`carousel-slide ${
            index === currentIndex 
              ? "active slide-in" 
              : index === previousIndex && isSliding 
                ? "slide-out" 
                : ""
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
    </div>
  );
};

export default LoginCarousel;

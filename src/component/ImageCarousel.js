import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';

const ImageCarousel = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const images = ['image/edit2.png', 'image/edit3.png', 'image/edit1.png'];

  useEffect(() => {
    const preloadImages = () => {
      const promises = images.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      Promise.all(promises)
        .then(() => setImagesLoaded(true))
        .catch((err) => console.error('Image loading failed', err));
    };

    preloadImages();
  }, [images]);

  return (
    <div>
      {imagesLoaded ? (
        <Carousel
          fade
          controls={false}
          indicators={true}
          pause={false}
          interval={5000}
          className="mb-4"
        >
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="image/edit2.png"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="image/edit3.png"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="image/edit1.png"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ImageCarousel;

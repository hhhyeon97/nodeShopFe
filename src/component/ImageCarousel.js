import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ColorRing } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const CustomLeftArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        left: '15px',
        top: '50%',
        transform: 'translateY(-50%)',
        // backgroundColor: 'rgba(255,255,255, 0.5)',
        background: 'none',
        opacity: '0.6',
        border: 'none',
        borderRadius: '50%',
        color: 'gray',
        cursor: 'pointer',
        padding: '10px 15px',
      }}
    >
      <FontAwesomeIcon icon={faAngleLeft} fontSize={'45px'} />
    </button>
  );
};

const CustomRightArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        right: '15px',
        top: '50%',
        transform: 'translateY(-50%)',
        // backgroundColor: 'rgba(255,255,255, 0.5)',
        background: 'none',
        opacity: '0.6',
        border: 'none',
        borderRadius: '50%',
        color: 'gray',
        cursor: 'pointer',
        padding: '10px 15px',
      }}
    >
      <FontAwesomeIcon icon={faAngleRight} fontSize={'45px'} />
    </button>
  );
};

const ImageCarousel = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const images = ['image/edit1.png', 'image/edit4.jpg', 'image/edit2.png'];

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

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div style={{ marginBottom: '30px' }}>
      {imagesLoaded ? (
        <Carousel
          responsive={responsive}
          autoPlay
          autoPlaySpeed={5000}
          infinite
          showDots={false}
          customTransition="transform 500ms ease-in-out"
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
          removeArrowOnDeviceType={['tablet', 'mobile']}
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
        >
          {images.map((src, index) => (
            <div key={index}>
              <img
                className="d-block w-100 carousel-image"
                src={src}
                alt={`slide-${index}`}
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <div className="center-spinner">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#779fe0', '#6d7787', '#e1e6ed']}
          />
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;

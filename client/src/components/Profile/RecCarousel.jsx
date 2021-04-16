import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import image1 from './carouselPhotos/drive.jpg';
import image2 from './carouselPhotos/kingkong.jpg';
import image3 from './carouselPhotos/tesla.jpg';
import image4 from './carouselPhotos/shining.jpg';
import image5 from './carouselPhotos/castle.jpg';
import image6 from './carouselPhotos/totalrecall.jpg';
import image7 from './carouselPhotos/bebop.jpg';
import './profile.css'; 
//import styled from 'styled-components';

// const Img = styled.div`
//     display: flex;
//     width: 100%;
//     height: 70vh;
//     min-height: 1200px;
//     padding: 1rem 1.5rem;
//     img {
//       object-fit: cover;
//       width: 20px%;
//       height: 20px%; 
//       display: block;
//     }
// `;
const RecCarousel = () => {
  const images = [image5, image2, image3, image4, image1, image6, image7];
  return (
    <Carousel>
      { images.map((image, i) => (
        <div key={i}>
         
          <img
            src={image}
            alt="Responsive image"
          />
            
          
        </div>
      ))}
    </Carousel>
  );
};

export default RecCarousel;

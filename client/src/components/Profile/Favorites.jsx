import React from 'react';
import { Carousel } from 'react-bootstrap/';
import image1 from './carouselPhotos/drive.jpg';
import image2 from './carouselPhotos/kingkong.jpg';
import image3 from './carouselPhotos/tesla.jpg';
import './profile.css'; 
import styled from 'styled-components';

const Img = styled.div`
    display: flex;
    width: 100%;
    height: 50vh;
    padding: 1rem 1.5rem;
    margin-top: 30px; 
    img {
      object-fit: cover;
      margin-left: 180px;
      height: 100%;
      display: block;
    }
`;
const favorites = () => {
  const images = [image1, image2, image3];
  return (
    <Carousel >
      { images.map((image, i) => (
        <Carousel.Item key = {i} >
          <Img>
            <img
              className="rounded mx-auto d-block w-100"
              src={image}
              alt="Responsive image"
            />
          </Img>
        </Carousel.Item>
      ))}
    </Carousel>

  );
};

export default favorites;

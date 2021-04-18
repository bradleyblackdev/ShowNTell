import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap/';
import './profile.css'; 
import axios from 'axios';
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

const RecCarousel = ({ recs }) => {

  const images = [];

  recs.forEach(rec => {
    const temp = `https://image.tmdb.org/t/p/original${rec.poster_path}`;
    images.push(temp);
  });
  
  return (
    <Carousel>
      { images.map((image, i) => (
        <Carousel.Item key={i}>
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

export default RecCarousel;

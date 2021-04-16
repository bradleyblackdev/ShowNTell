import React, { useState } from 'react';
//import RecCarousel from './RecCarousel.jsx';
import cartoon from './carouselPhotos/cartooncircle.jpg';
//import kong from './carouselPhotos/kingkong.jpg';
import drive from './carouselPhotos/drive.jpg'; 
import Favorites from './Favorites.jsx';
import styled from 'styled-components'; 

import './profile.css'; 

const Button = styled.button`
color: black;
font-size: 1em;
margin-top: .8em;
padding: 0.25em 1em;
border: 2px solid lightgray; 
border-radius: 3px;
background: whitesmoke;
margin-left: 83px;
margin-bottom: 100px;




`;
const UserProfile = () => {
  return (
    <div>
      <div className="body">
        <div className="userProfile">
          <div>
            <h3>Profile</h3>
            <div className="profile">
              <img className="cartoon" src={cartoon} alt=""/>
              <h3>Name:</h3>
              <p>Daniel Gene </p>
              <h3>Bio:</h3>
              <p>see ya space-cowboy </p>
              <h3>Genres:</h3>
              <p>Romantic Comedies</p>

              
            </div>
            <div>

              <Button >Friends</Button>
            </div>
            <div className="favorites">
              <h3>youre shows</h3>
              <p>based on your subscriptions</p>
              <Favorites />
            </div>
            <div className="recommendations">
              <h3>Your Recommendations</h3>
              <p>Shows you might like.</p>
              <img className="moto" src={drive} alt=""/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

// const UserProfile = () => {
//     return (
//       <div>
  
  
//       <div>
  
  
//       </div>
  
//       <h1></h1>
//       <div className="user container-fluid movie-app">
//         <div className="row">
  
//           <RecCarousel />
//         </div>
//       </div>
  
  
  
//       </div>
//     );
//   };

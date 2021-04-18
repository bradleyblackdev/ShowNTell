import React, { useState } from 'react'; 
import axios from 'axios'; 
import cartoon from './carouselPhotos/cartooncircle.jpg';
import Favorites from './Favorites.jsx';
import '../MovieMode/MovieMode.css'; 
import './profile.css'; 

// const Button = styled.button`
// color: white;
// font-size: 1em;
// margin-top: 25px;
// padding: 0.25em 1em;
// border: 1px solid black; 
// border-radius: 3px;
// font-family: 'Montserrat', sans-serif;
// background: transparent;
// margin-left: -255px;
// margin-bottom: 140px;

// `;



const UserProfile = ({ user, subs, }) => {
  const { name, friends } = user; 

  return (
    <div>
      <div className="body">
        <div className="userProfile">
          <div>
            
            <div className="profile">
              <img className="cartoon" src={cartoon} alt=""/>
              <h3>Name:</h3>
              <p>{ name }</p>
              <h3>Bio:</h3>
              <p>see ya space-cowboy</p>
              <h3>Genres:</h3>
              <p>Romantic Comedies</p>

              
            </div>
            
            <div className="dropdown2">
              <button className="dropbtn2">Friends</button>
              <div className="dropdown-content2">
                <a>friends</a>
              </div>
            </div>
          </div>
          <div className="favorites">
            <h3>youre shows</h3>
            <p>based on your subscriptions</p>
            <Favorites user={user} subs={subs} />
          </div>
          <div className="recommendations">
            <h3>Your Recommendations</h3>
            <p>Shows you might like.</p>
            <img className="moto" alt=""/>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default UserProfile;


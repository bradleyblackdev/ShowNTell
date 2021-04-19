import React, { useState } from 'react';
import axios from 'axios';
//import noImgAvail from '../SearchBar/no_img_avail.png';
import './showPage.css';
import Youtube from './youtube.jsx';
// import DummieData from '../../data.json';


const ShowPage = ({ show, subscribe, showId }) => {

  const getImage = () => {
    if (show.poster_path !== null) {
      return `https://image.tmdb.org/t/p/original/${show.poster_path}`;
    }
    if (show.poster_path === null) {
      return noImgAvail;
    }
  };

  return (
    <div className="show-page-container">
      <div>
        <img className="show-page-img" src={getImage()} alt="" />
      </div>
      <h3 className="show-header">Title:</h3>
      <div className="show-release-date">{show.media_type === 'tv' ? show.name : show.title}</div>
      <h3 className="show-header">Release Date:</h3>
      <div className="show-release-date">{show.media_type === 'tv' ? show.first_air_date : show.release_date}</div>
      <h3 className="show-header">Overview:</h3>
      <div className="show-overview">
        Overview:
        {show.overview}
      </div>
      <button className="trailer-button" onClick={() => subscribe(show)}>Subscribe</button>
      <Youtube show={show}/>
    </div>
  );
};

export default ShowPage;

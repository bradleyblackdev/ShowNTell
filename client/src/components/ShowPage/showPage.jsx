import React, { useState } from 'react';
import axios from 'axios';
import noImgAvail from '../SearchBar/no_img_avail.png';
import './showPage.css';
// import DummieData from '../../data.json';


const ShowPage = ({ show }) => {
  // const [show, setShow] = useState({});
  console.log('show from showpage', show);
  // const [gotShow, setGotShow] = useState(false);
  const getShowInfo = () => {
    // setShow(DummieData);
    // if (!gotShow) {
    //   axios.get(`/show/${showId}`)
    //     .then(({ data }) => {
    //       setShow(data);
    //       setGotShow(true);
    //     }).then(() => {
    //       if (show.posts) {
    //         const promises = show.posts.map((post) => axios.get(`/post/${post}`).catch());
    //         return Promise.all(promises);
    //       }
    //     }).then((results) => {
    //       if (results) {
    //         setPosts(results.map((result) => result.data));
    //       }
    //     })
    //     .catch();
    // }
  };


  const getImage = () => {
    if (show.poster_path !== null) {
      return `https://image.tmdb.org/t/p/original/${show.poster_path}`;
    }
    if (show.poster_path === null) {
      return noImgAvail;
    }
  };

  //DAVIDS TRAILER -- MAKE SURE TO PLACE ON NEW COMPONENT
  const getTrailer = (title) => {
    axios.get(`/trailer/${title}`)
      .then((data) => {
        console.log('DATA FROM SHOW PAGE', data);
      // setTrailer(data)
      })
      .catch();
  };

  return (
    <div className="show-page-container">
      <h1 className="shw-title">
        Title:
        {show.title}
      </h1>
      <div>
        <img className="show-page-img" src={getImage()} alt="" />
      </div>
      {/* trailer modal goes here */}
      <h3 className="show-header">Release Date:</h3>
      <div className="show-release-date">{show.release_date}</div>
      <h3 className="show-header">Overview:</h3>
      <div className="show-overview">
        Overview:
        {show.overview}
      </div>
      {/* <button className="sub-btn" onClick={() => subscribe(showId)}>subscribe</button> */}
      <button className="trailer-button" onClick={() => getTrailer(show.title)}>Trailer</button>
    </div>
  );
};

export default ShowPage;

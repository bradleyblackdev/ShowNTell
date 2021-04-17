import React, { useState } from 'react';
import './search.css';
import noImgAvail from './no_img_avail.png';

const SearchFeedEntry = ({ show, onClick, setShow }) => {

  // console.log(show, 'SEARCH FEED ENTRY SHOW');
  const [state, setState] = useState('');

  const setShowPageObj = (newShow) => {

    setShow(newShow);
    onClick('showPage');
  };
  const getSummary = () => {
    if (show.overview !== null) {
      return show.overview;
    }
  };
  const getImage = () => {
    if (show.poster_path !== null) {
      return `https://image.tmdb.org/t/p/original/${show.poster_path}`;
    }
  };
  const getPicUnavail = () => {
    if (show.poster_path === null) {
      return noImgAvail;
    }
  };
  const Arrow = ({ text, className }) => {
    return (
      <div
        className={className}
      >
        {text}
      </div>
    );
  };

  const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
  const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

  return (
    <div className="show-card">
      <div className="show-name" value={show.id} onClick={() => setShowPageObj(show)}>
        <img className="show-img" src={getImage()} alt="" />
        <img className="unavail-img" src={getPicUnavail()} alt="" />
        <div className="show-name">{show.title}</div>
      </div>
    </div>
  );
};

export default SearchFeedEntry;

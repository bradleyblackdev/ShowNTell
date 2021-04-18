import React from 'react';
import SearchFeedEntry from './searchEntry.jsx';
import './search.css';

const SearchFeed = ({ shows, onClick, arrow, setShow }) => {
  return (
    <div>
      <div className="search-results-header">Search results: </div>
      <div className="scrolling-container">
        {shows.map((show, i) => <SearchFeedEntry classname="search-feed-entry" key={i} show={show} onClick={onClick} setShow={setShow}/>)}
      </div>
    </div>
  );
};

export default SearchFeed;

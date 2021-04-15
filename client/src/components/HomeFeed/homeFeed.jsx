import React, { useState } from 'react';
import FeedItem from './feedItem.jsx';
import './homefeed.css';

const HomeFeed = ({ posts, handleUserClick, user, setPosts }) => (
  <div >
    <div className="home-title"> Home feed</div>
    <div style={{marginRight: '350px'}} className="home-feed-container">
      {posts
        ? posts.map((post, i) => (
          <FeedItem
            handleUserClick={handleUserClick}
            post={post}
            setPosts={setPosts}
            key={post + i}
            user={user}
          />
        ))
        : null}
    </div>
  </div>
);

export default HomeFeed;

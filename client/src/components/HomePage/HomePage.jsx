import React, { useState } from 'react';
import './HomePage.css';
import {
  FaComments,
  FaHandHoldingHeart,
  FaChalkboardTeacher,
} from 'react-icons/fa';
import pic from './img/mainpic.png';
import Card from './Card.jsx';

const HomePage = () => (
  <div>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@700&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap" rel="stylesheet" />
    <div className="top-of-page">
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@700&display=swap"
        rel="stylesheet"
      />
      <div id="text-block">
        <p className="text1">
          Tired of finishing a show and having no one to talk about it with?
        </p>
        <p className="text2">
          Show&Tell is a global community of TV fans of every genre.
        </p>
        <p className="text3">Sign up now and join the conversation.</p>
      </div>
      <img id="main-pic" src={pic} alt="pic" />
    </div>
    <p className="bottom-text">WITH SHOW&TELL, YOU CAN:</p>
    <Card
      icon={<FaComments />}
      body="join communities and create a personalized feed of your favorite content"
    />
    <Card
      icon={<FaHandHoldingHeart />}
      imageUrl=""
      body="show some love for your favorite shows, posts and fellow users with a “like”"
    />
    <Card
      icon={<FaChalkboardTeacher />}
      imageUrl=""
      body="write and share reviews, and follow friends and other members to see theirs"
    />
  </div>
);

export default HomePage;

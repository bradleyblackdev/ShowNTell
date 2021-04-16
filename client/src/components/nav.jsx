import React, { useState } from 'react';
import { FaHome, FaStar, FaPen, FaBell, FaEnvelope, FaSearch, FaDoorOpen } from 'react-icons/fa';
import logo from './HomePage/img/logo1.png';


const Nav = ({ user, onClick, logout, search, setSearch, onSearch, toggleChatWindow }) => (
  <div>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap" rel="stylesheet" />
    <img
      id="homeButton"
      src={logo}
      alt="logo"
      onClick={() => onClick('homePage')}
      className="views"
      title="home feed"
    />
    <ul className="navbar">
      <li onClick={() => onClick('home')} id="home-icon" className="views" title="home feed">
        <FaHome />
        {/* <p id="home-icon-hover">home</p> */}
        {' '}
      </li>
      <li onClick={() => onClick('sub')} className="views" title="subscriptions">
        {' '}
        <FaStar />
      </li>
      <li onClick={() => onClick('post')} className="views" title="create a post">
        {' '}
        <FaPen />
        {' '}
      </li>
      <li onClick={() => onClick('notifs')} className="views" title="notifications">
        <FaBell />
        {' '}
      </li>
      <li onClick={() => toggleChatWindow()} className="views" title="messages">
        <FaEnvelope />
        {' '}
      </li>
      <li onClick={logout} title="log out"><FaDoorOpen /></li>
      <li>
        {' '}
        <div className="wrap">
          <div className="search">
            <input
              type="text"
              className="search-term"
              placeholder="what are you watching?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSearch();
                }
              }}
            />
            <FaSearch
              type="submit"
              className="srch-button"
              onClick={onSearch}
            >
              <i className="search-icon" />
            </FaSearch>
          </div>
        </div>
      </li>
    </ul>
  </div>
);

export default Nav;

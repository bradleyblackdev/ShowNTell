import React, { useState } from 'react';
import axios from 'axios';
import './sub.css';

const Sub = ({ user, setView, subs, getSubs, setSubs, gotSubs, setGotSubs}) => {


  return (
    <div>
      <h1 id="header">Subscriptions:</h1>
      <div>
        {getSubs()}
        {subs.map((sub, i) => (
          <div
            className="sub"
            key={sub + i}
            data-id={sub.id}
            onClick={(e) => setView(e.target.dataset.id)}
          >
            {sub.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sub;

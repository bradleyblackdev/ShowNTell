import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import './MovieMode.css';

export const classicTheme = {
  classic: true,
  neutral: 'white',
  primary: '#1d3b61',
  secondary: '#Dd3e42',
  tertiary: '#F0ccb3',
  quaternary: '#408ac8',
  quinary: '#140e3e',
};

export const MovieMode = ({subs, theme, setTheme}) => {
  const changeTheme = (e, sub) => {
    sub.name === 'classic' ?
      setTheme(classicTheme) :
      axios.get('/theme', {
        params: {
          backdropPath: sub.backdropPath,
          id: sub.id
        }
      })
        .then(({data}) => {
          if (data) {
            const {palette, backdropUrl, neutral} = data;
            const {Vibrant, DarkVibrant, LightVibrant, Muted, LightMuted, DarkMuted} = palette;
            setTheme({
              neutral: neutral,
              primary: `rgb(${DarkVibrant._rgb})`,
              secondary: `rgb(${LightVibrant._rgb})`,
              tertiary: `rgb(${DarkMuted._rgb})`,
              quaternary: `rgb(${LightMuted._rgb})`,
              quinary: `rgb(${Vibrant._rgb})`,
              opaque: `rgba(${Muted._rgb}, 0.75)`,
              image: backdropUrl
            });
          } else {
            setTheme(classicTheme);
          }
        }).catch((err) => console.warn(err));
  };

  useEffect(() => {
    const onScroll = () => {
      // setOpacity(window.scrollY / 200);
    };
  
    window.addEventListener('scroll', onScroll);
  
    return function cleanup() {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="dropdown">
      <button className="dropbtn">Movie Mode</button>
      <div className="dropdown-content">
        <a onClick={(e) => changeTheme(e, {name: 'classic'})} >Classic Theme</a>
        {subs.map((sub, i) => (
          <a onClick={(e) => changeTheme(e, sub)} key={JSON.stringify(sub + i)}>{sub.name}</a>
        )
        )}
      </div>
    </div>
  );
};


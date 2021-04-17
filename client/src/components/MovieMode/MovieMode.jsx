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
        params: sub
      })
        .then(({data: {palette, backdropURL, neutral, neutraltoo}}) => {
          console.log(neutral, neutraltoo);
          const {Vibrant, DarkVibrant, LightVibrant, Muted, LightMuted, DarkMuted} = palette;
          // const pickNeutral = (r, g, b) => {
          // console.log(((r * 0.299) + (g * 0.587) + (b * 0.114)));
          // return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
          // 'black' : 
          // 'white';
          // };
          setTheme({
            // neutral: pickNeutral(...Vibrant.rgb),
            neutral: neutral,
            primary: `rgb(${DarkVibrant.rgb})`,
            secondary: `rgb(${LightVibrant.rgb})`,
            tertiary: `rgb(${DarkMuted.rgb})`,
            quaternary: `rgb(${LightMuted.rgb})`,
            quinary: `rgb(${Vibrant.rgb})`,
            opaque: `rgba(${Muted.rgb}, 0.8)`,
            image: backdropURL
          });
        }).catch(() => setTheme(classicTheme));
  };



  const [opacity, setOpacity] = useState(0);
  
  useEffect(() => {
    const onScroll = () => {
      setOpacity(window.scrollY / 200);
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


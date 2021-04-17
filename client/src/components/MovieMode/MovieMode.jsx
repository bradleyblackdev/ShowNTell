import React from 'react';
import axios from 'axios';
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
        .then(({data: {palette, backdropURL}}) => {
          const {Vibrant, DarkVibrant, LightVibrant, Muted, LightMuted, DarkMuted} = palette;
          const pickNeutral = (r, g, b) => {
            return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
              'black' : 
              'white';
          };
          setTheme({
            neutral: pickNeutral(...palette.DarkMuted.rgb),
            primary: `rgb(${DarkVibrant.rgb})`,
            secondary: `rgb(${LightVibrant.rgb})`,
            tertiary: `rgb(${DarkMuted.rgb})`,
            quaternary: `rgb(${Vibrant.rgb})`,
            quinary: `rgb(${Vibrant.rgb})`,
            image: backdropURL
          });
        });
  };

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


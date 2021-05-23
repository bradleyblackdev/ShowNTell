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
              primary: `rgb(${DarkVibrant._rgb || DarkVibrant.rgb})`,
              secondary: `rgb(${LightVibrant._rgb || LightVibrant.rgb})`,
              tertiary: `rgb(${DarkMuted._rgb || DarkMuted.rgb})`,
              quaternary: `rgb(${LightMuted._rgb || LightMuted.rgb})`,
              quinary: `rgb(${Vibrant._rgb || Vibrant.rgb})`,
              opaque: `rgba(${Muted._rgb || Muted.rgb}, 0.75)`,
              image: backdropUrl
            });
          } else {
            setTheme(classicTheme);
          }
        }).catch((err) => console.warn(err));
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


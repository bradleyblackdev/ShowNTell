/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
// /* eslint-disable import/no-named-as-default */
// /* eslint-disable import/no-named-as-default-member */
// /* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import axios from 'axios';
import HomePage from './HomePage/HomePage.jsx';
import Nav from './nav.jsx';
import HomeFeed from './HomeFeed/homeFeed.jsx';
import Sub from './Subscriptions/sub.jsx';
import Post from './CreatePost/post.jsx';
import DMs from './DMs/dms.jsx';
import Notifs from './Notifications/notifs.jsx';
import SearchFeed from './SearchBar/searchFeed.jsx';
import ShowFeed from './Subscriptions/showFeed.jsx';

import {ThemeProvider} from 'styled-components';
import {GlobalStyles} from './Styles/globalstyles';
import ColorScheme from 'color-scheme';
import {theme1, theme2} from './Themes/themes';



const App = () => {
  const [posts, setPosts] = useState();
  const [user, setUser] = useState();
  const [view, setView] = useState('homePage');
  const [search, setSearch] = useState('');
  const [searchedShows, setSearchedShows] = useState([]);
  const [userClicked, setUsersClicked] = useState(false);
  const [test, setTest] = useState(false);

  const [theme, setTheme] = useState(250);
  const changeTheme = ({target: {value}}) => {
    setTheme(value);
  };

  const theme1 = () => {
    const scheme1 = new ColorScheme;
    scheme1.from_hue(Math.floor(Math.random() * 360))
      .scheme('contrast');
    const colors = scheme1.colors();
    const pickNeutral = (bgColor) => {
      const r = parseInt(bgColor.slice(0, 2), 16);
      const g = parseInt(bgColor.slice(2, 4), 16);
      const b = parseInt(bgColor.slice(4, 6), 16);
      return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
        'black' : 
        'white';
    };
    return {
      neutral: pickNeutral(colors[0]),
      primary: `#${colors[0]}`,
      secondary: `#${colors[1]}`,
      tertiary: `#${colors[2]}`,
      quaternary: `#${colors[3]}`,
      contrast: `#${colors[4]}`
    };
  };



  const changeView = (newView) => {
    setView(newView);
  };

  const getUser = () => {
    if (!user) {
      axios
        .get('/user')
        .then(({ data }) => setUser(data))
        .then(() => setTest(true))
        .catch();
    } else if (test) {
      changeView('home');
      setTest(false);
    }
  };

  const getPosts = () => {
    if (!posts && user) {
    // if (!userClicked) {
    //   executed = !executed;
      axios
        .get('/posts')
        .then(({ data }) => {
          setPosts(data);
        })
        .catch();
    }
    // }
  };

  const logout = () => {
    axios.get('/logout').then(() => {
      setView('homePage');
      setUser(null);
      setPosts(null);
    });
  };

  const createPost = (post) => {
    axios
      .post('/posts', post)
      .then(() => setView('home'))
      .then(() => axios.get('/user').then(({ data }) => setUser(data)))
      .then(() => axios.get('/posts').then(({ data }) => setPosts(data)))
      .catch();
  };

  const searchShows = () => {
    axios.get(`/search/${search}`).then(({ data }) => {
      setView('search');
      setSearch('');
      setSearchedShows(data);
    }).catch();
  };

  const handleUserClick = (e) => {
    setUsersClicked(!userClicked);
    const usersName = e.target.innerHTML;
    axios.get(`/user/posts/${usersName}`).then(({ data }) => {
      // console.log('TESTING', data);
      setPosts(data);
    });
  };

  const handleShowFeed = () => {
    setUsersClicked(!userClicked);
    getPosts();
  };

  const addShow = (show) => {
    axios.get(`/show/${show.id}`)
      .then(({ data }) => setView(data.id))
      .catch();
  };

  const subscribe = (showId) => {
    axios.put(`/subscribe/${showId}`)
      .then(() => axios.get('/user').then(({ data }) => setUser(data)))
      .catch();
  };

  const getView = () => {
    if (view === 'homePage') {
      return <HomePage />;
    }
    if (view === 'sub') {
      return <Sub user={user} setView={setView} />;
    }
    if (view === 'post') {
      return <Post user={user} createPost={createPost} />;
    }
    if (view === 'home') {
      return <HomeFeed handleUserClick={handleUserClick} user={user} posts={posts} setPosts={setPosts} />;
    }
    if (view === 'DMs') {
      return <DMs user={user} setUser={setUser} />;
    }
    if (view === 'notifs') {
      return <Notifs user={user} setUser={setUser} />;
    }
    if (view === 'search') {
      return <SearchFeed shows={searchedShows} onClick={addShow} />;
    }
    return <ShowFeed showId={view} subscribe={subscribe} />;
  };

  return (
    <div>
      <ThemeProvider theme={theme1(theme)}>
        <GlobalStyles/>
        <select onClick={changeTheme}>
          <option value='null'>Movie Mode</option>
          <option value="theme1">theme1</option>
          <option value="theme2">theme2</option>
        </select>
        {user
          ? (
            <Nav
              user={user}
              search={search}
              onClick={changeView}
              logout={logout}
              setSearch={setSearch}
              onSearch={searchShows}
            />
          )
          : (
            <a
              className="login-button"
              href="/auth/google"
            // onClick={() => axios.get('/auth/google').then(({ data }) => console.log(data))}
            >
            LOGIN WITH GOOGLE
            </a>
          )}
        {getUser()}
        {getPosts()}
        {userClicked ?
          (
            <button onClick={handleShowFeed}>Show Home Feed</button>
          ) : 
          null}
        {getView()}
      </ThemeProvider>
    </div>
  );
};

export default App;

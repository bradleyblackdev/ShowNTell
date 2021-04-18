import React, { useState } from 'react';
import axios from 'axios';
import pic from './createpost.png';
import './post.css';

const Post = ({ user, createPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [show, setShow] = useState('none');
  const [error, setError] = useState('');
  const [subs, setSubs] = useState([]);
  const [gotSubs, setGotSubs] = useState(false);

  const onClick = () => {
    if (show !== 'none' && title !== '') {
      createPost({ title, content, show, poster: user._id });
      setTitle('');
      setContent('');
    } else if (title === '') {
      setError('Must have a title.');
    } else if (show === 'none') {
      setError('Please choose a show to talk about.');
    }
  };

  const getSubs = () => {
    if (!gotSubs) {
      const promises = user.subscriptions.map((showId) => axios.get(`/show/${showId}`).catch());
      Promise.all(promises)
        .then((results) => results.map((sub) => sub.data))
        .then((shows) => {
          setSubs(shows);
          setGotSubs(true);
        })
        .catch();
    }
  };

  return (
    <div>
      <h1 id="header">Create a post</h1>
      <div id="post-sub-header"> share your thoughts with the world!</div>
      <div className="create-post-form">
        <select className="choose-show" onChange={(e) => setShow(e.target.value)}>
          <option className="choose-show" value="none">Choose a Show</option>
          {subs.map((sub, i) => <option className="option-show" key={sub + i} value={sub.id}>{sub.name}</option>)}
          {getSubs()}
        </select>
        <div className="title-container">
          <input id="post-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" />
        </div>
        <div className="content-container">
          <textarea id="post-text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="what's your message?" />
        </div>
        <button id="submit-button" onClick={onClick}>submit post</button>
        <h4 id="error-message">{error}</h4>
      </div>
      <img id="pic" src={pic} alt="pic" />
    </div>
  );
};

export default Post;

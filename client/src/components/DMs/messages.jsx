import React, { useState } from 'react';
import axios from 'axios';
import './dms.css';

const Messages = (props = {}) => {
  const [content, setContent] = useState();
  const { id, messages, setUser, user } = props;
  let message;
  if (messages) {
    messages.forEach((data) => {
      if (data.id === id) {
        message = data;
      }
    });
  }
  let current;
  return (
    <div>
      <div className="message-content">
        {
          message
            ? message.text.map((data, i) => {
              let test = true;
              if (current === data.name) {
                test = false;
              }
              current = data.name;
              return (
                <div key={data.message + i}>
                  <h2 className="msg-from">{test ? data.name : null}</h2>
                  <div className="msg-text">{data.message}</div>
                </div>
              );
            }) : null
        }
      </div>
      <div className="send-msg-area">
        <h3 className="send-msg-header">send a new message:</h3>
        <input className="write-message-box" placeholder="what's on your mind?" onChange={(e) => setContent(e.target.value)} />
        <button
          className="send-message-button"
          onClick={() => {
            axios.put(`/sendMessage/${id}/${content}`)
              .then(() => {
                axios.get('/user')
                  .then((result) => {
                    setUser(result.data);
                    axios.get(`/notifs/${content} By ${user.name}/${id}`);
                  });
              });
          }}
        >
          send
        </button>
      </div>
    </div>
  );
};

export default Messages;

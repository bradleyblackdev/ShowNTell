import React, { } from 'react';
import './chatWindow.css';

const ChatMessage = ({ message }) => {
  return (
    <div>
      <img src="client\src\components\DMs\greencircle2.1.png"></img>
      <div className="chat-message-content clearfix">
        <span className="chat-time">{message.time}</span>
        <h5>{message.username}</h5>
        <p>{message.message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;

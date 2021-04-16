import React, { useState } from 'react';
import './chatWindow.css';

const ChatMessage = ({ message,  }) => {
  return (
      // <img src="client\src\components\DMs\greencircle2.1.png"></img>
      <div className="chat-message-content clearfix">
        <span className="chat-time">13:37</span>
        <h5>Marco Biedermann</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, nulla accusamus magni vel debitis numquam qui tempora rem voluptatem delectus!</p>
      </div>
  );
};

export default ChatMessage;

import React, { } from 'react';
import './chatWindow.css';

const ChatFriendsList = ({ friend }) => {
  return (
    <div>
      <li className="friendlist-friend clearfix">
        <h3>{friend.name}</h3>
      </li>
    </div>
  );
};

export default ChatFriendsList;
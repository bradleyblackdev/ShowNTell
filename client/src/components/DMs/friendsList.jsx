import React, { } from 'react';
import './chatWindow.css';

const ChatFriendsList = ({ friend, retrieveMessages }) => {

  return (
    <div>
      <li value={friend.name} className="friendlist-friend clearfix">
        <h3 onClick={()=> retrieveMessages(friend.chatId)}>{friend.name}</h3>
      </li>
    </div>
  );
};

export default ChatFriendsList;
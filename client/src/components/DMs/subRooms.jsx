import React, { } from 'react';
import './chatWindow.css';

const SubsChatList = ({ subs, }) => {

  return (
    <div>
      <li value={subs.name} className="friendlist-friend clearfix">
        <h3 onClick={()=> retrieveMessages(friend.chatId)}>{subs.name}</h3>
      </li>
    </div>
  );
};

export default SubsChatList;

import React, { } from 'react';
import './chatWindow.css';

const SubsChatList = ({ sub, setRoom}) => {

  return (
    <div>
      <li value={sub.name} className="friendlist-friend clearfix">
        <h3 onClick={()=> setRoom(sub.name)}>{sub.name}</h3>
      </li>
    </div>
  );
};

export default SubsChatList;

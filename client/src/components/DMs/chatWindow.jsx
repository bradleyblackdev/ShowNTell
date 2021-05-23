import React, { useState } from 'react';
import ChatMessage from './chatMessage.jsx';
import './chatWindow.css';
import SubsChatList from './subRooms.jsx';
import axios from 'axios';
import moment from 'moment';
import SocketIOclient from 'socket.io-client';
const endpoint = 'http://localhost:3000';
const socket = SocketIOclient(endpoint);

const ChatWindow = ({ toggleChatWindow, user, subs }) => {
  const [ messages, setMessages ] = useState([]);
  const [ friendListView, setfriendListView ] = useState(true);
  const [ chatText, setChatText ] = useState('');
  const [ room, setRoom ] = useState('');


  socket.on('message', msg => {
    setMessages(messages.concat(msg));
  });

  const retrieveMessages = (chatId) => {
    axios.get(`/retrieveMessages/${chatId}`)
      .then((res) => {
        setMessages(res.data);
      }).then(() => setfriendListView(false))
      .catch(err => {
        throw err;
      });
  };

  const joinSubChatRoom = (room) => {
    socket.connect();
    const { name } = user;
    setRoom(room);
    socket.emit('joinRoom', { name, room});
    setfriendListView(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      username: user.name,
      message: chatText,
      time: moment().format('h:mm a'),
      room: room
    };

    socket.emit('chatMessage', newMessage);

    setChatText('');
    e.target.focus();
  };

  return (
    <div className="chat-window">
      <div id="live-chat">
        <header className="clearfix">
          <a className='chat-subs' onClick={() => {
            setfriendListView(true);
            socket.emit('leave', room);
            setRoom('');
            setMessages(['']);
            //console.log(messages);
          }}>Chat Rooms</a>
          <a className='chat-close' onClick={() => toggleChatWindow()}>close</a>
          <h4>{user.name}</h4>
        </header>
        {friendListView ? 
          (
            <div className='chat'>
              <div className='chat-history'>
                <header><h3>Chatrooms</h3></header>
                <ul>
                  <div>
                    <li className="friendlist-friend clearfix">
                      <h3 onClick={()=> joinSubChatRoom('Global')}>Global Chat</h3>
                    </li>
                  </div>
                  {subs.map(sub => <SubsChatList  
                    key={sub.id} 
                    sub={sub} 
                    retrieveMessages={retrieveMessages}
                    setRoom={joinSubChatRoom}
                  />)}
                </ul>
              </div>
            </div>
          )
          : (
          
            <div className='chat'>
              <h3>{room}</h3>
              <div className='chat-history'>
                {messages.map(message => <ChatMessage message={message} key={message.id}/>)}
              </div>
              <form onSubmit={(e) => handleSubmit(e)}>
                <fieldset >
                  <input type="text" value={chatText} onChange={(e) => setChatText(e.target.value)} placeholder={user.name}></input>
                  <button>send</button>
                </fieldset>
              </form>
            </div>
          //</div>
          )}
      </div>
    </div>
  );
};




export default ChatWindow;


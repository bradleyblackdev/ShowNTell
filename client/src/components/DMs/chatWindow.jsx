import React, { useState } from 'react';
import ChatMessage from './chatMessage.jsx';
import './chatWindow.css';
import ChatFriendsList from './friendsList.jsx';
import axios from 'axios';
import moment from 'moment';
import SocketIOclient from 'socket.io-client';
const endpoint = 'http://localhost:3000';
const socket = SocketIOclient(endpoint);


const ChatWindow = ({ toggleChatWindow, user, subs }) => {
  //const [newMessage, setNewMessage] = useState();
  const [messages, setMessages] = useState([{username:'eebs', message: 'hey', time: '2:12'},{username:'ibrahim', message: 'hi', time: '2:12'},{username:'eebs', message: 'wyd', time: '2:14'},{username:'ibrahim', message: 'nothing', time: '2:20'}]);
  //const [open, setOpen] = useState(false);
  const [friendListView, setfriendListView] = useState(true);
  const [newMessagesCount, setNewMessagesCount] = useState(0);
  const [friends, setFriends] = useState(user.friends);
  const [chatText, setChatText] = useState('');

  const retrieveMessages = (chatId) => {
    axios.get(`/retrieveMessages/${chatId}`)
      .then((res) => {
        setMessages(res.data)
      }).then(() => setfriendListView(false))
      .catch(err => {
        throw err;
      });
  };

  const updateMessages = (chatId, messages) => {
    axios.put(`/updateMessages/${chatId}`, {
      messages: messages
    }).catch(err =>{
      throw err;
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages(messages.concat({
      username: user.name,
      message: chatText,
      time: moment().format('h:mm a')
    }));
    //console.log(messages);
    setChatText('');
    e.target.focus();
    //console.log(socket);
    console.log(subs, 'subs');
  };

  return (
    <div className="chat-window">
      {friendListView ? 
        (
          <div id="live-chat">
            <header className="clearfix" >
              <a className='chat-close' onClick={() => toggleChatWindow()}>close</a>
              <a className='chat-back' onClick={() => setfriendListView(!friendListView)}>friends</a>
              <span className='chat-message-counter'>{newMessagesCount}</span>
              <h4>{user.name}</h4>
            </header>
            <div className='chat'>
              <div className='chat-history'>
                <ul>
                  {friends.map(friend => <ChatFriendsList  key={friend.id} friend={friend} retrieveMessages={retrieveMessages}/>)}
                </ul>
              </div>
            </div>
          </div>
          // <div>
          //   <ul>
          //     {friends.map(friend => <li key={friend.id}>{friend.name}</li>)}
          //   </ul>
          // </div>
        )
        : (
          <div id="live-chat">
            <header className="clearfix">
              <a className='chat-close' onClick={() => toggleChatWindow()}>close</a>
              <a className='chat-back' onClick={() => setfriendListView(!friendListView)}>friends</a>
              <span className='chat-message-counter'>{newMessagesCount}</span>
              <h4>{user.name}</h4>
            </header>
            <div className='chat'>
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
          </div>
        )}
    </div>
  );
};

{/* <button className="chat-close-button" onClick={() => toggleChatWindow()}>Close</button>
            <button className="chat-back-button" onClick={() => setfriendListView(true)}>Back</button>
            <div className="current-messages">
              <h3>Your messages</h3>
            </div>
            <textarea id="chat-message"></textarea> */}

{/* <div id="live-chat">
    
<header class="clearfix">
  
  <a href="#" class="chat-close">x</a>

  <h4>Mehmet Mert</h4>

  <span class="chat-message-counter">3</span>

</header>

<div class="chat">
  
  <div class="chat-history">
    
    <div class="chat-message clearfix">
      
      <img src="http://lorempixum.com/32/32/people" alt="" width="32" height="32">

      <div class="chat-message-content clearfix">
        
        <span class="chat-time">13:35</span>

        <h5>John Doe</h5>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, explicabo quasi ratione odio dolorum harum.</p>

      </div> <!-- end chat-message-content -->

    </div> <!-- end chat-message -->

    <hr>

    <div class="chat-message clearfix">
      
      <img src="http://gravatar.com/avatar/2c0ad52fc5943b78d6abe069cc08f320?s=32" alt="" width="32" height="32">

      <div class="chat-message-content clearfix">
        
        <span class="chat-time">13:37</span>

        <h5>Marco Biedermann</h5>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, nulla accusamus magni vel debitis numquam qui tempora rem voluptatem delectus!</p>

      </div> <!-- end chat-message-content -->

    </div> <!-- end chat-message -->

    <hr>

    <div class="chat-message clearfix">
      
      <img src="http://lorempixum.com/32/32/people" alt="" width="32" height="32">

      <div class="chat-message-content clearfix">
        
        <span class="chat-time">13:38</span>

        <h5>John Doe</h5>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>

      </div> <!-- end chat-message-content -->

    </div> <!-- end chat-message -->

    <hr>

  </div> <!-- end chat-history -->

  <p class="chat-feedback">Yazıyor..</p>

  <form action="#" method="post">

    <fieldset>
      
      <input type="text" placeholder="Mesajınızı Yazın" autofocus>
      <input type="hidden">

    </fieldset>

  </form>

</div> <!-- end chat -->

</div> <!-- end live-chat --> */}



export default ChatWindow;


import React, { useState } from 'react';
import ChatMessage from './chatMessage.jsx';
import './chatWindow.css';

const ChatWindow = ({ toggleChatWindow, friends, user }) => {
  const [newMessage, setNewMessage] = useState();
  const [messages, setMessages] = useState(['asdasd', 'asdasdasd', 'asdasda']);
  //const [open, setOpen] = useState(false);
  const [friendList, setFriendList] = useState(false);
  const [newMessagesCount, setNewMessagesCount] = useState(0);



  return (
    <div className="chat-window">
      {friendList ? 
        (
          <div>
            <ul>
              {friends.map(friend => <li>{friend.name}</li>)}
            </ul>
          </div>
        )
        : (
          <div id="live-chat">
            <header className="clearfix">
              <a className='chat-close' onClick={() => toggleChatWindow()}>x</a>
              <span className='chat-message-counter'>{newMessagesCount}</span>
              <h4>{user}</h4>
            </header>
            <div className='chat'>
              <div className='chat-history'>
                {messages.map(message => <ChatMessage/>)}
              </div>
              <form action="#" method="post">
                <fieldset>
                  <input type="text" placeholder="Mesajınızı Yazın"></input>
                  <input type="hidden"></input>
                </fieldset>
              </form>
            </div>
          </div>
        )}
    </div>
  );
};

{/* <button className="chat-close-button" onClick={() => toggleChatWindow()}>Close</button>
            <button className="chat-back-button" onClick={() => setFriendList(true)}>Back</button>
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

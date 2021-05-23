/* eslint-disable multiline-ternary */
import React, { useState } from 'react';
import axios from 'axios';
import Messages from './messages.jsx';
import './dms.css';

const DMs = ({ user, setUser }) => {
  const [messages, setMessages] = useState();
  const [Users, setUsers] = useState();
  const [find, setfind] = useState();
  return (
    <div>
      { messages ? <Messages id={messages} messages={user.messages} user={user} setUser={setUser} />
        : (
          <div>
            <link href="https://fonts.googleapis.com/css2?family=Poppins&family=Work+Sans:wght@300&display=swap" rel="stylesheet" />
            <h1 id="header">Direct Messages</h1>
            <div id="dms-sub-header"> connect with another user!</div>
            <div>
              {
                Users ? (
                  <div id="search-for-user-button">
                    <input
                      className="user-search-form"
                      onChange={(e) => {
                        setfind(e.target.value);
                      }}
                      placeholder="search for user"
                    />
                    <div>
                      {Users.map(({ name, id }) => {
                        if (user.id === id) {
                          return null;
                        }
                        if (find) {
                          return name.toLowerCase().includes(find.toLowerCase()) ? (
                            <h4
                              id="users1"
                              key={String(id)}
                              onClick={() => {
                                for (let i = 0; i < user.messages.length; i += 1) {
                                  if (user.messages[i].id === String(id)) {
                                    return setMessages(String(id));
                                  }
                                }
                                axios.put(`/startMessage/${id}/${name}`)
                                  .then(() => {
                                    setMessages(String(id));
                                    axios.get('/user')
                                      .then((result) => setUser(result.data));
                                  });
                              }}
                            >
                              {name}
                            ?
                            </h4>
                          ) : null;
                        }
                        return (
                          <div>
                            <h4
                              id="searched-users"
                              key={String(id)}
                              onClick={() => {
                                for (let i = 0; i < user.messages.length; i += 1) {
                                  if (user.messages[i].id === String(id)) {
                                    return setMessages(String(id));
                                  }
                                }
                                axios.put(`/startMessage/${id}/${name}`)
                                  .then(() => {
                                    setMessages(String(id));
                                    axios.get('/user')
                                      .then((result) => setUser(result.data));
                                  });
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div />
                  </div>
                )
                  : (
                    <button
                      id="create-message-button"
                      onClick={() => {
                        axios.get('/users')
                          .then(({ data }) => {
                            setUsers(data);
                            axios.get('/user')
                              .then((result) => setUser(result.data));
                          })
                          .catch();
                      }}
                    >
                    create message
                    </button>
                  )
              }
            </div>
            <div className="inbox">
              <h1>Inbox: </h1>
              {
                user.messages.map((({ id, name }) => (
                  <h2
                    key={String(id)}
                    onClick={() => setMessages(String(id))}
                  >
                    {name}
                  </h2>
                )))
              }
            </div>
          </div>
        )}
    </div>
  );
};

const getAllUsers = () => {
  axios.get('/users')
    .then(({ data }) => {
      setUsers(data);
      axios.get('/user')
        .then((result) => setUser(result.data));
    })
    .catch();
};

export default DMs;

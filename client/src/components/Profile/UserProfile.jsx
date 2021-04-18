import React, { useState } from 'react'; 
import axios from 'axios'; 
//import RecCarousel from './RecCarousel.jsx';
import cartoon from './carouselPhotos/cartooncircle.jpg';
//import kong from './carouselPhotos/kingkong.jpg';
import drive from './carouselPhotos/drive.jpg'; 
import Favorites from './Favorites.jsx';
import styled from 'styled-components'; 
import '../MovieMode/MovieMode.css'; 
import './profile.css'; 
//import { get } from 'jquery';
// const Button = styled.button`
// color: white;
// font-size: 1em;
// margin-top: 25px;
// padding: 0.25em 1em;
// border: 1px solid black; 
// border-radius: 3px;
// font-family: 'Montserrat', sans-serif;
// background: transparent;
// margin-left: -255px;
// margin-bottom: 140px;
// `;
const UserProfile = ({ user, setUser, show, shows, subs, setSubs, getSubs, setShow }) => {
  const { name, friends } = user; 
  const [ addFriendView, setAddFriendView] = useState(false);
  const [ users, setUsers] = useState();
  const [ friendsList, setFriendsList ] = useState(friends); 
  const [ find, setFind ] = useState(); 
  //const [ friends, setFriends ] = useState({});
  // setFriends = () => {
  // }; 
  const searchUser = (find) => {
    let searchUserBool = false; 
    users.forEach(user => {
      if (find.toLowerCase() === user.name.toLowerCase()) {
        addFriend(user);
        searchUserBool = true; 
      } 
    });
    if (searchUserBool === false) {
      alert ('No user found with that name');
    }
    console.log(users);
  }; 

  const addFriend = (newFriend) => {
    const chatId = parseInt(user.id.toString().slice(4, 7) + newFriend.id.toString().slice(4, 7));
    //const { name, id, _id} = user;
    if (!friendsList.length) {
      setFriendsList(friendsList.concat({
        name: newFriend.name, 
        id: newFriend.id,  
        chatId: chatId
      }
      ));
      user.friends = friendsList;
    } else {
      const hasFriendBool = false;
      friendsList.forEach(friend => {
        if (friend.name === newFriend.name) {
          hasFriendBool === true;
        }
      });
      if (!hasFriendBool) {
        setFriendsList(friendsList.concat({
          name: newFriend.name, 
          id: newFriend.id,  
          chatId: chatId
        }
        ));
      } else {
        alert(`You are already friends with ${newFriend.name}`);
      }
    }
    //console.log('friends', friendsList); 
  };

  const getAllUsers = () => {
    axios.get('/users')
      .then(({ data }) => {
        setUsers(data);
        axios.get('/user')
          .then((result) => setUser(result.data));
      })
      .catch(err => {
        throw err;
      });
  };

  return (
    <div>
      <div className="body">
        <div className="userProfile">
          <div>
            <div className="profile">
              <img className="cartoon" src={cartoon} alt=""/>
              <h3>Name:</h3>
              <p>{ name }</p>
              <h3>Bio:</h3>
              <p>see ya space-cowboy</p>
              <h3>Genres:</h3>
              <p>Romantic Comedies</p>
            </div>
            <div>
              {addFriendView ? 
                (
                  <div>
                    <input onChange={(e) => setFind(e.target.value)} type="text"></input>
                    <button onClick={() => {
                      searchUser(find);
                    }} type="submit">Add</button>
                  </div>
                )  
                :
                (
                  <div>
                    <button onClick={() => {
                      setAddFriendView(!addFriendView);
                      getAllUsers();
                    }}>Add Friend</button>
                  </div>
                )
              }
              <div className="dropdown2">
                <button className="dropbtn2">Friends</button>
                <div className="dropdown-content2">
                  <a>friends</a>
                </div>
              </div>
            </div>
            <div className="favorites">
              <h3>youre shows</h3>
              <p>based on your subscriptions</p>
              <Favorites user={user} shows={shows} setShow={setShow} subs={subs} setSubs={setSubs} getSubs={getSubs}/>
            </div>
            <div className="recommendations">
              <h3>Your Recommendations</h3>
              <p>Shows you might like.</p>
              <img className="moto" src={drive} alt=""/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
// const UserProfile = () => {
//     return (
//       <div>
//       <div>
//       </div>
//       <h1></h1>
//       <div className="user container-fluid movie-app">
//         <div className="row">
//           <RecCarousel />
//         </div>
//       </div>
//       </div>
//     );
//   };
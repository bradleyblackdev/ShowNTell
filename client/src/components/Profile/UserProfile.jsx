import React, { useState } from 'react'; 
import axios from 'axios'; 
import cartoon from './carouselPhotos/cartooncircle.jpg';
import Favorites from './Favorites.jsx';
import '../MovieMode/MovieMode.css'; 
import RecCarousel from './RecCarousel.jsx';
import './profile.css'; 

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



const UserProfile = ({ user, setUser, show, shows, subs, setSubs, getSubs, setShow, recs }) => {
  const { name, friends } = user; 
  const [ addFriendView, setAddFriendView] = useState(false);
  const [ users, setUsers] = useState();
  const [ friendsList, setFriendsList ] = useState(friends); 
  const [ find, setFind ] = useState(); 
  //const [ friends, setFriends ] = useState({});

  // setFriends = () => {
    
  // }; 

  const searchUser = (find) => {
    
    users.forEach(user => {
      let searchUserBool = false; 
      if (find.toLowerCase() === user.name.toLowerCase()) {
        addFriend(user);
        searchUserBool = true; 
      } 
      if (searchUserBool === false) {
        alert ('No user found with that name');
      }
    });
  }; 

  const addFriend = (user) => {
    const { name, id, _id} = user;
    if (!friendsList.length) {
      setFriendsList(friendsList.concat({name, id, _id}));
    } else {
      const hasFriendBool = false;
      friendsList.forEach(friend => {
        if (friend.name === name) {
          alert(`You are already friends with ${name}`);
          hasFriendBool === true;
        }
      });
      if (!hasFriendBool) {
        setFriendsList(friendsList.concat({name, id, _id}));
      }
    }
    console.log('this is user!!', user);
    console.log('thisis users', users); 
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
            
            <div className="dropdown2">
              <button className="dropbtn2">Friends</button>
              <div className="dropdown-content2">
                <a>friends</a>
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
              <RecCarousel recs={recs}/>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default UserProfile;

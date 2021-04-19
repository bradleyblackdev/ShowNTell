import React, { useState } from 'react';
import './profile.css'; 

const EditProfile = ({ handleSubmit }) => {

  const [bioContent, setBioContent] = useState(''); 
  return (

    <div>
      <form onSubmit={(e) => handleSubmit(e, bioContent)}>
        <fieldset >
          <input type="text" value={bioContent} onChange={(e) => setBioContent(e.target.value)} placeholder={'bio'}></input>
          <button>send</button>
        </fieldset>
      </form>
    </div>
  ); 

};


export default EditProfile;

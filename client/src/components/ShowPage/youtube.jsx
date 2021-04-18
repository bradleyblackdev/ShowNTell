import React, { useState } from 'react';
import axios from 'axios';
import ModalVideo from 'react-modal-video';
const Youtube = ({show}) => {
  const [isOpen, setOpen] = useState(false);
  const [trailer, setTrailer] = useState({});
  const prepTrailer = (title) => {
    setOpen(true);
    getTrailer(title);
  };
  const getTrailer = (title) => {
    axios.get(`/trailer/${title}`)
      .then(({data}) => {
        setTrailer(data.id.videoId);
        console.log('DATA FROM Youtube request', data.id.videoId);
      })
      .catch();
  };
  return (
    <React.Fragment>
      <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={trailer} onClose={() => setOpen(false)} />
      <button className="btn-primary trailer-button" onClick={()=> prepTrailer(show.title)}>View Trailer</button>
    </React.Fragment>
  );
};
export default Youtube;

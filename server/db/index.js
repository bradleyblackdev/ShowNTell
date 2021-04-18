const mongoose = require('mongoose');
require('dotenv').config();

const uri = `mongodb+srv://scrumlord1:${process.env.DATABASE_PASSWORD}@scrumlordsfirstcluster.ied2s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
<<<<<<< HEAD
//const uri = 'mongodb://localhost/ShowNTell';
=======
// const uri = 'mongodb://localhost/ShowNTell';
>>>>>>> e30ca6bf1f54c5acb6270f11d1ab67efc1ff74b8

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  // eslint-disable-next-line no-console
  .then(() => console.log('connected to db'))
  .catch();

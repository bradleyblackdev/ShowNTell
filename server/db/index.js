const mongoose = require('mongoose');
require('dotenv').config();

const uri = `mongodb+srv://scrumlord1:${process.env.DATABASE_PASSWORD}@scrumlordsfirstcluster.ied2s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const uri = 'mongodb://localhost/ShowNTell';

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  // eslint-disable-next-line no-console
  .then(() => console.log('connected to db'))
  .catch();

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  id: String,
  name: String,
  avatar: String,
  cloudinaryId: String,
  posts: Array,
  messages: Array,
  phone: String,
  notifs: Array,
  follows: Array,
  subscriptions: Array,
  friends: Array,
  bio: String,
});

const Users = mongoose.model('Users', userSchema);

const showSchema = mongoose.Schema({
  name: String,
  id: Number,
  posts: Array,
  subscriberCount: Number,
  backdropPath: String,
  genreIds: Array,
  overview: String,
  posterPath: String,
  releaseDate: String,
  title: String,
  voteAverage: Number,
});

const Shows = mongoose.model('Shows', showSchema);

const postSchema = mongoose.Schema({
  user: String,
  show: String,
  title: String,
  content: String,
  comment: Array,
  createdAt: Date,
  likes: Array,
});

const Posts = mongoose.model('Posts', postSchema);

const replySchema = mongoose.Schema({
  user: String,
  content: String,
  comment: Array,
  createdAt: Date,
  likes: Array,
});

const Replys = mongoose.model('Replys', replySchema);

<<<<<<< HEAD
const messageSchema = mongoose.Schema({
  messages: Array,
  messageid: Number,
});

const Messages = mongoose.model('Messages', messageSchema);
=======
const themeSchema = mongoose.Schema({
  id: Number,
  palette: Object,
  neutral: String,
  backdropUrl: String,
});

const Themes = mongoose.model('Themes', themeSchema);

const trailerSchema = mongoose.Schema({
  title: String,
  content: String,
  video: String
});

const Trailer = mongoose.model('Trailer', trailerSchema);
>>>>>>> e30ca6bf1f54c5acb6270f11d1ab67efc1ff74b8

module.exports = {
  Users,
  Shows,
  Posts,
  Replys,
<<<<<<< HEAD
  Messages,
=======
  Themes,
  Trailer
>>>>>>> e30ca6bf1f54c5acb6270f11d1ab67efc1ff74b8
};

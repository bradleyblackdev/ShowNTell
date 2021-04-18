const path = require('path');
const express = require('express');
const passport = require('passport');
const axios = require('axios');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const Vibrant = require('node-vibrant');
require('dotenv').config();
require('./db/index');


const tmdbApiKey = process.env.TMDB_API_KEY;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const youtubeApi = process.env.YOUTUBE_API_KEY;
const Notifs = require('twilio')(accountSid, authToken);
const { GoogleStrategy } = require('./oauth/passport');
const { Users, Posts, Shows, Replys, Themes } = require('./db/schema.js');

const app = express();

const client = path.resolve(__dirname, '..', 'client', 'dist');


let userInfo = null;

app.use(express.static(client));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/favicon.ico', express.static(path.resolve(__dirname, 'assets', 'sntfavicon.jpg')));


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    saveUninitialized: false,
    resave: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.get(
  '/auth/google',
  passport.authenticate(
    'google',
    { scope: ['https://www.googleapis.com/auth/plus.login'] },
    (req, res) => {
      // res.redirect('/');
    },
  ),
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/logout' }),
  (req, res) => {
    const newUser = new Users({
      id: req.user.id,
      name: req.user.displayName,
    });
    res.cookie('ShowNTellId', req.user.id);
    Users.findOne({ id: req.user.id }).then((data) => {
      if (data) {
        res.redirect('/');
        userInfo = data;
      } else {
        newUser.save().then(() => {
          userInfo = newUser;
          res.redirect('/');
        });
      }
    });
  },
);

app.get('/user', (req, res) => {
  Users.findOne({ id: req.cookies.ShowNTellId }).then((userInfo) => {
    res.send(userInfo);
  });
});

app.get('/users', (req, res) => {
  Users.find()
    .then((data) => res.status(200).json(data))
    .catch();
});

app.get('/posts', (req, res) => {
  Posts.find()
    .then((posts) => res.send(posts))
    .catch();
});

app.get('/shows', (req, res) => {
  Shows.find()
    .then((data) => res.status(200).json(data))
    .catch();
});

app.get('/findUser', (req, res) => {
  Users.find()
    .then((data) => res.json(data))
    .catch();
});

app.get('/user/posts/:name', (req, res) => {
  const user = req.params.name;
  Posts.find({ name: user })
    .then((posts) => res.send(posts))
    .catch();
});

app.put('/startMessage/:user/:name', (req, res) => {
  Users.findOne({ id: req.cookies.ShowNTellId }).then((data) => {
    userInfo = data;
    Users.updateOne(
      { id: userInfo.id },
      {
        messages: [
          ...userInfo.messages,
          { id: req.params.user, name: req.params.name, text: [] },
        ],
      },
    )
      .then((result) => res.json(result))
      .catch();
  });
});

app.put('/sendMessage/:id/:text', (req, res) => {
  const content = userInfo.messages;
  Users.findOne({ id: req.cookies.ShowNTellId }).then((data) => {
    userInfo = data;
    for (let i = 0; i < content.length; i += 1) {
      if (content[i].id === req.params.id) {
        content[i].text.push({ name: userInfo.name, message: req.params.text });
        break;
      }
    }
    Users.updateOne({ id: userInfo.id }, { messages: content })
      .then(() => Users.findOne({ id: req.params.id }))
      .then((result) => {
        const replace = result.messages || [];
        let test = false;
        for (let i = 0; i < replace.length; i += 1) {
          if (replace[i].id === String(userInfo.id)) {
            replace[i].text.push({
              name: userInfo.name,
              message: req.params.text,
            });
            test = true;
            break;
          }
        }
        if (test) {
          Users.updateOne(
            { id: req.params.id },
            {
              messages: replace,
              notifs: [...data.notifs, `${userInfo.name} messaged you`],
            },
          ).then((results) => res.json(results));
        } else {
          Users.updateOne(
            { id: req.params.id },
            {
              messages: [
                ...replace,
                {
                  id: String(userInfo.id),
                  name: userInfo.name,
                  text: [{ name: userInfo.name, message: req.params.text }],
                },
              ],
              notifs: [...data.notifs, `${userInfo.name} messaged you`],
            },
          ).then((allResult) => res.json(allResult));
        }
      });
  });
});



app.put('/subscribe', (req, res) => {
  const show = req.body;
  Shows.findOne({id: show.id})
    .then((record) => {
      if (record) {
        return record;
      } else {
        const releaseDate = show.media_type === 'tv' ? 
          show.first_air_date : 
          show.release_date;
        const title = show.media_type === 'tv' ? 
          show.name : 
          show.title;
        Shows.create({
          name: title,
          id: show.id,
          posts: [],
          subscriberCount: 0,
          backdropPath: show.backdrop_path,
          genreIds: show.genre_ids,
          overview: show.overview,
          posterPath: show.poster_path,
          releaseDate: releaseDate,
          title: title,
          voteAverage: show.vote_average,
        });
      }
    }).then(() => {
      Users.findOne({ id: req.cookies.ShowNTellId }).then(user => {
        if (!user.subscriptions.includes(show.id)) {
          Users.updateOne(
            { id: user.id },
            { subscriptions: [...user.subscriptions, show.id] },
          )
            .then(() => {
              Shows.findOne({ id: show.id })
                .then((record) => {
                  Shows.updateOne(
                    { id: show.id },
                    { subscriberCount: record.subscriberCount + 1 },
                  ).catch();
                })
                .catch();
            })
            .catch();
        }
      })
        .then(() => res.status(200).send())
        .catch(() => res.status(500).send());
    });
});

app.get('/delete', (req, res) => {
  Users.deleteMany()
    .then(() => Posts.deleteMany())
    .then(() => Shows.deleteMany())
    .then(() => Replys.deleteMany())
    .then(() => res.status(200).json('done'))
    .catch();
});

app.get('/logout', (req, res) => {
  userInfo = null;
  res.clearCookie('ShowNTellId');
  res.status(200).json(userInfo);
});

app.post('/posts', (req, res) => {
  const { title, content, poster, show, name } = req.body;
  Users.findOne({ id: req.cookies.ShowNTellId }).then((data) => {
    userInfo = data;
    return Posts.create({
      title,
      content,
      user: poster,
      name,
      show,
      comments: {},
      createdAt: new Date(),
      liked: false,
      likedCount: 0,
    })
      .then((post) => {
        Users.findById(poster)
          .then((user) => {
            userInfo.posts = [...user.posts, post._id];
            Users.updateOne(
              { _id: poster },
              { posts: [...user.posts, post._id] },
            ).catch();
          })
          .then(() => {
            Shows.findOne({ id: show })
              .then((record) => {
                Shows.updateOne(
                  { id: show },
                  { posts: [...record.posts, post._id] },
                ).catch();
              })
              .catch();
          })
          .catch();
      })
      .then(() => res.status(201).send())
      .catch(() => res.status(500).send());
  });
});

app.get('/post/:id', (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => res.status(200).send(post))
    .catch(() => res.status(500).send());
});

app.post('/number', (req, res) => {
  const { number } = req.body;
  Users.findOne({ id: req.cookies.ShowNTellId }).then((data) => {
    userInfo = data;
    if (!number) {
      Users.updateOne({ id: userInfo.id }, { phone: number }).then((data) => res.json(data));
    } else {
      Users.updateOne(
        { id: userInfo.id },
        {
          phone: number,
          notifs: [`you will now receive notifications @ ${number}   `],
        },
      ).then((data) => res.json(data));
    }
  });
});

app.get('/notifs/:text/:id', (req, res) => {
  Users.findOne({ id: req.cookies.ShowNTellId }).then((data) => {
    userInfo = data;

    res.json(req.params);
    if (req.params.id === 'null') {
      Notifs.messages
        .create({
          body: req.params.text,
          from: '+12678677568',
          to: userInfo.phone,
        })
        .then((message) => res.json(message.sid))
        .catch();
    } else {
      Users.findOne({ id: req.params.id }).then((data) => {
        Notifs.messages
          .create({
            body: req.params.text,
            from: '+12678677568',
            to: data.phone,
          })
          .then((message) => res.json(message.sid))
          .catch();
      });
    }
  });
});

app.delete('/notifs/:index', (req, res) => {
  const replacementNotif = [];
  Users.findOne({ id: req.cookies.ShowNTellId }).then((data) => {
    userInfo = data;
    for (let i = 0; i < userInfo.notifs.length; i += 1) {
      if (i !== Number(req.params.index)) {
        replacementNotif.push(userInfo.notifs[i]);
      }
    }
    Users.update(
      { id: userInfo.id },
      { notifs: replacementNotif },
    ).then((data) => res.json(data));
  });
});

app.get('/postShow/:id', (req, res) => {
  Shows.findOne({ id: req.params.id }).then((data) => res.json(data));
});

app.get('/postUser/:id', (req, res) => {
  Users.findOne({ _id: req.params.id }).then((data) => res.json(data));
});

app.get('/liked/:id', (req, res) => {
  Users.findOne({ id: req.cookies.ShowNTellId }).then((data) => {
    userInfo = data;

    Posts.findOne({ _id: req.params.id }).then((data) => {
      const newLike = [];
      let test = true;
      for (let i = 0; i < data.likes.length; i += 1) {
        if (data.likes[i] === userInfo.id) {
          test = false;
          continue;
        } else {
          newLike.push(data.likes[i]);
        }
      }
      if (test) {
        Posts.updateOne(
          { _id: req.params.id },
          { likes: [...data.likes, userInfo.id] },
        ).then(() => res.json());
      } else {
        Posts.updateOne({ _id: req.params.id }, { likes: newLike }).then(() => res.json());
      }
    });
  });
});

app.get('/replys/:id/:content', (req, res) => {
  Users.findOne({ id: req.cookies.ShowNTellId }).then((data) => {
    userInfo = data;
    Replys.create({
      user: userInfo._id,
      content: req.params.content,
      comment: [],
      likes: [],
    }).then(({ _id }) => {
      Posts.findOne({ _id: req.params.id }).then((data) => {
        Posts.updateOne(
          { _id: req.params.id },
          { comment: [...data.comment, _id] },
        )
          .then(() => Posts.findOne({ _id: req.params.id }))
          .then((result) => res.json(result));
      });
    });
  });
});

app.get('/feeds/:id', (req, res) => {
  Replys.findOne({ _id: req.params.id }).then((data) => res.json(data));
});

app.get('/findReplays', (req, res) => {
  Replys.find().then((data) => res.json(data));
});

app.post('/replys/:id/:content', (req, res) => {
  Users.findOne({ id: req.cookies.ShowNTellId }).then((data) => {
    userInfo = data;
    Replys.create({
      user: userInfo._id,
      content: req.params.content,
      comment: [],
      likes: [],
    }).then(({ _id }) => {
      Replys.findOne({ _id: req.params.id }).then((data) => {
        Replys.updateOne(
          { _id: req.params.id },
          { comment: [...data.comment, _id] },
        )
          .then(() => Replys.findOne({ _id: req.params.id }))
          .then((result) => res.json(result));
      });
    });
  });
});

app.get('/likedPost/:id', (req, res) => {
  Users.findOne({ id: req.cookies.ShowNTellId }).then((data) => {
    userInfo = data;
    Replys.findOne({ _id: req.params.id }).then((data) => {
      const newLike = [];
      let test = true;
      for (let i = 0; i < data.likes.length; i += 1) {
        if (data.likes[i] === userInfo.id) {
          test = false;
          continue;
        } else {
          newLike.push(data.likes[i]);
        }
      }
      if (test) {
        Replys.updateOne(
          { _id: req.params.id },
          { likes: [...data.likes, userInfo.id] },
        ).then(() => res.json());
      } else {
        Replys.updateOne({ _id: req.params.id }, { likes: newLike }).then(() => res.json());
      }
    });
  });
});


// NEW SEARCH REQUEST
app.get('/search/:query', (req, res) => {
  const movie = `https://api.themoviedb.org/3/search/multi?api_key=${tmdbApiKey}&query=${req.params.query}`;

  axios.get(movie)
    .then(({data: {results}}) =>{
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});


app.get('/show/:id', (req, res) => {
  Shows.find({ id: req.params.id })
    .then((record) => {
      if (record.length > 0) {
        return record[0];
      }
      return axios(`https://api.themoviedb.org/3/search/multi?api_key=${tmdbApiKey}&query=${req.params.id}`)
        .then(({ data }) => Shows.create({
          id: data.id,
          name: data.title,
          posts: [],
          subscriberCount: 0,
        }))
        .then((result) => result)
        .catch();
    })
    .then((result) => res.status(200).send(result))
    .catch(() => res.status(500).send());
});

//Get Trailers
app.get('/trailer/:query', (req, res) => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${req.params.query}trailer&channelType=any&key=${youtubeApi}`;
  return axios(url)
    .then(({ data }) => data.items[0])
    .then((data) => res.status(200).send(data))
    .catch();
});

//algoREC
// USER Subscriptions =>
// releaseDate => RANGE
// genreIds => MODE
// voteAverage => +/- 2 pt of AVERAGE

const genreFinder = (genreIds) => {

  if (genreIds == null || genreIds.length == 0) {
    return 0;
  }
  genreIds.sort();

  let previous = genreIds[0];
  let popular = genreIds[0];
  let count = 1;
  let maxCount = 1;

  for (let i = 1; i < genreIds.length; i++) {
    if (genreIds[i] == previous) { count++; } else {
      if (count > maxCount) {
        popular = genreIds[i - 1];
        maxCount = count;
      }
      previous = genreIds[i];
      count = 1;
    }
  }
  return count > maxCount ? 
    genreIds[genreIds.length - 1] : 
    popular;
};
//final
app.get('/algo/:id', (req, res) => {
  //QUERY USERS COLLECTION FOR SUBSCRIPTIONS IDs (plural) =>
  Users.findOne({ id: req.params.id }).then(({subscriptions}) => {
    const data = subscriptions;
    return subscriptions;
  })
    .then(data => {
      const storage = {
        'title': [],
        'genreIds': [],
        'releaseDate': [],
        'voteAverage': []
      };
      Shows.find({ id: data })
        .then((dataResults) => {
          dataResults.map(result => {
            storage['title'].push(result.title);
            storage['genreIds'].push(...result.genreIds);
            storage['releaseDate'].push(result.releaseDate);
            storage['voteAverage'].push(result.voteAverage);
          });
          return storage;
        })
        .then(storage => {
          const genre = genreFinder(storage['genreIds']);
          const releaseStart = storage['releaseDate'].sort()[0];
          const releaseEnd = storage['releaseDate'].sort()[storage['releaseDate'].length - 1];
          const ratingStart = storage['voteAverage'].sort()[0];
          const ratingEnd = storage['voteAverage'].sort()[storage['voteAverage'].length - 1];
  
          axios.get(`${tvRec}api_key=${tmdbApiKey}&air_date.gte=${releaseStart}&air_date.lte=${releaseEnd}&with_genres=${genre}&vote_average.gte=${ratingStart}&vote_average.lte=${ratingEnd}`)
            .then(({data: {results} }) => {
              const tvRecs = results.splice(0, 3);
  
              axios.get(`${movieRec}api_key=${tmdbApiKey}&primary_release_date.gte=${releaseStart}&primary_release_date.lte=${releaseEnd}&with_genres=${genre}&vote_average.gte=${ratingStart}&vote_average.lte=${ratingEnd}`)
                .then(({data: {results} }) => {
                  const movieRecs = results.splice(0, 3);
                  res.send(tvRecs.concat(movieRecs));
                });
            });
        })
        .catch();
    });
}); 

const movieRec = 'https://api.themoviedb.org/3/discover/movie?';
const tvRec = 'https://api.themoviedb.org/3/discover/tv?';

//https://api.themoviedb.org/3/discover/movie?api_key=c4beeba3761a8ef52fff82a164fa4205&first_air_date=2006-09-15&with_genres=80&vote_average.gte=5&vote_average.lte=10

//TV RECOMMENDATIONS
app.get('/tvRecs', ((req, res) => {
  
  const releaseStart = '2006-09-15'; //beginning release date from subscribe
  const releaseEnd = '2014-10-22';
  const genre = 18; //genre from subscribe
  const ratingStart = 5; //average rating from subscribe
  const ratingEnd = 10; //average rating end

  axios.get(`${tvRec}api_key=${tmdbApiKey}&air_date.gte=${releaseStart}&air_date.lte=${releaseEnd}&with_genres=${genre}&vote_average.gte=${ratingStart}&vote_average.lte=${ratingEnd}`)
    .then(({data: {results} }) => {
      res.send(results);
    });
}));

//MOVIE RECOMMENDATIONS
app.get('/movieRecs', ((req, res) => {
  
  const releaseStart = '2014-09-15'; //beginning release date from subscribe
  const releaseEnd = '2014-10-22'; //ending release date from subscribe
  const genre = 80; //genre from subscribe
  const ratingStart = 5; //average rating from subscribe
  const ratingEnd = 10; //average rating end

  axios.get(`${movieRec}api_key=${tmdbApiKey}&primary_release_date.gte=${releaseStart}&primary_release_date.lte=${releaseEnd}&with_genres=${genre}&vote_average.gte=${ratingStart}&vote_average.lte=${ratingEnd}`)
    .then(({data: {results} }) => {
      res.send(results);
    });
}));

app.get('/theme', (req, res) => {
  const id = req.query.id;
  Themes.findOne({ id })
    .then(theme => {
      if (theme) {
        res.send(theme);
      } else {
        const backdropPath = req.query.backdropPath;
        if (backdropPath) {
          const backdropUrl = `https://image.tmdb.org/t/p/original/${backdropPath}`;
          Vibrant.from(backdropUrl).getPalette()
            .then(palette => {
              const neutral = palette.Muted.getBodyTextColor();
              res.send({id, backdropPath, palette, neutral, backdropUrl});
              Themes.create({id, backdropPath, palette, neutral, backdropUrl});
            });
        } else {
          res.send(null);
        }
      }
    });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('http://localhost:3000');
});

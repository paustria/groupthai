import express from 'express';
import bcrypt from 'bcryptjs';
import session from 'express-session';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import morgan from 'morgan';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import genSalt from '../client/utils/salt';
import { APP_ROOT, APP_PORT, MONGO_URI } from '../../config';
import User from './models/user';

require('dotenv').config();

const app = express();

export default app;

app.set('port', APP_PORT)
.use(morgan('combined'))
.use(express.static(`${APP_ROOT}/public`))
.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: true }));

/**
* Mongoose
*/
const MONGODB = {
  uri: MONGO_URI,
};
mongoose.connect(MONGODB.uri);

/**
* Local auth
*/
const localStrategy = new LocalStrategy((username, password, done) => {
  User.findOne({ 'local.username': username }, (err, user) => {
    if (err) return done(err);

    if (!user) {
      console.log('user not found. user=', username);
      return done(null, false, { message: 'User not found.' });
    }

    const salt = genSalt(username.toLowerCase());
    bcrypt.hash(password, salt, (error, hash) => {
      if (error) return done(error);

      if (!user.verifyPassword(hash)) {
        console.log('invalid password. user=', username);
        return done(null, false, { message: 'Invalid password.' });
      }

      return done(null, user);
    });

    return null;
  });
});
passport.use(localStrategy);

/**
* Facebook auth
*/
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

const facebookStrategy = new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: '/auth/callback/facebook',
  profileFields: ['id', 'displayName', 'first_name', 'last_name', 'emails', 'photos'],
  enableProof: true,
},
(accessToken, refreshToken, profile, done) => {
  console.log('Successfully login from facebook.');
  User.findOrCreate(profile, accessToken, (err, user) => done(err, user));
},
);

// required for passport session
// TODO use store
app.use(session({
  secret: 'secrettexthere',
  saveUninitialized: true,
  resave: true,
}));

passport.use(facebookStrategy);
passport.serializeUser((user, done) => { // used to serialize the user for the session
  // console.log(`Serialize user id= ${user.id}`);
  done(null, user.id);
});
passport.deserializeUser((id, done) => { // used to deserialize the user
  User.findById(id, (err, user) => {
    if (!err) done(null, user);
    else done(err, null);
  });
});
app.use(passport.initialize());
app.use(passport.session());

/**
* Login facebook endpoint
*/
app.get('/auth/facebook',
passport.authenticate('facebook'));

app.get('/auth/callback/facebook',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  // on success
  (req, res) => {
    res.redirect('/?facebook=true');
  },
  // on error; likely to be something FacebookTokenError token invalid or already used token,
  // these errors occur when the user logs in twice with the same token
  (err, req, res) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    return null;
  },
);

function ensureAuthenticated(req, res, next) {
  // console.log('req.session.passport.user='+req.session.passport.user)

  if (req.isAuthenticated()) { return next(); }
  return res.status(401).json({ message: 'User is not authorized.' });
}

app.get('/profile',
  ensureAuthenticated, (req, res) => res.status(200).json({ user: res.user }));

/**
* Routes
*/
require('./api/jobs');

/**
* Login endpoint
*/
// const doesUserExist = (user) => {
//   // TODO: check in DB.
//   if (users[user]) return true;
//   return false;
// };

app.post('/register', (req, res) => {
  // TODO require name and email
  const { username, password } = req.body;
  const salt = genSalt(username.toLowerCase());
  bcrypt.hash(password, salt, (err, hash) => {
    if (err) return res.status(500).json({ error: true });
    const user = new User({
      name: username,
      local: { username, password: hash },
    });
    user.save((err1) => {
      if (err1) {
        console.log(`Error while create new user :${err1}`);
        if (err1.code === 11000) {
          return res.status(403).send('Email already exists.');
        }
        return res.status(500).send('Internal Server Error.');
      }
      console.log('Create new user');
      req.login(user, (err2) => {
        if (err2) {
          console.log(`Error while login :${err2}`);
          return res.status(401).send(err2);
        }
        console.log('Login Successfully');
        return res.status(200).json({ user: user.local });
      });
      return null;
    });
    return null;
  });
});

app.post('/login', passport.authenticate('local'),
  (req, res) => {
    if (req.user) {
      return res.status(200).json({ user: req.user });
    }

    return res.status(401).json({ error: 'Failed login.' });
  });

app.get('/user', ensureAuthenticated,
  (req, res) => {
    if (req.user) {
      return res.status(200).json({ user: req.user });
    }

    return res.status(401).json({ error: 'Please log in.' });
  });

app.put('/user', ensureAuthenticated,
  async (req, res) => {
    const { _id, name, email } = req.body;
    const user = await User.findById(_id).exec();

    // user.set(page)
    // if (req.session.user) {
    //   return res.status(200).json({ user: req.session.user });
    // }
    //
    // return res.status(401).json({ error: 'Please log in.' });
  });

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

/**
 * SPA
 */
app.get('*', (req, res) => res.sendFile(`${APP_ROOT}/public/index.html`));

/**
 * Run the server
 */
app.listen(app.get('port'),
  () => console.log(`Express server listening on port ${app.get('port')}`));

import express from 'express';
import bcrypt from 'bcryptjs';
import genSalt from '../client/utils/salt';
import bodyParser from 'body-parser';
import { dirname } from '../../config';
require('dotenv').config();

//
// const app = express();
// const salt = bcrypt.genSaltSync(10);
//
// app.set('port', process.env.PORT || 3000)
//     .use(express.static(dirname + '/public'))
//     .use(bodyParser.json());
//
// // Initialize
// const username = 'phily';
// const usernameSalt = genSalt(username);
//
// const password = bcrypt.hashSync('password123', usernameSalt);
// const users = {
//     [username]: bcrypt.hashSync(password, salt)
// };
//
// const doesUserExist = (user) => {
//     // TODO: check in DB.
//     if (users[user]) return true;
//     return false;
// };
//
// app.post('/login', function(req, res) {
//     const account = req.body;
//
//     if (doesUserExist && bcrypt.compareSync(account.password, users[username])) {
//         console.log('Successfully login.');
//         return res.status(200).json({authenticated: true, token: 'thisIsToken'});
//     }
//
//     console.log('Failed login.');
//     return res.status(401).json({error: 'Failed login.'});
// })
// .get('*', (req, res) => {
//     return res.sendFile(dirname + '/public/index.html');
// })
// .listen(app.get('port'),
//     () => console.log('Express server listening on port ' + app.get('port'))
// );
//
const mongoose = require('mongoose');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
//const User = mongoose.model('User');

const app = express();
const salt = bcrypt.genSaltSync(10);

app.set('port', process.env.PORT || 3000)
    .use(express.static(dirname + '/public'))
    .use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

// Initialize
const username = 'phily';
const usernameSalt = genSalt(username);

const password = bcrypt.hashSync('password123', usernameSalt);
const users = {
    [username]: bcrypt.hashSync(password, salt)
};

// TODO: YUI
// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    // User.findById(id, function(err, user) {
    //     done(err, user);
    // });
});


// TODO: keep id and secret in file

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/callback'
},
function(accessToken, refreshToken, profile, cb) {
    //   User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //       return cb(err, user);
    //   });
    console.log('Successfully login.');
    return cb(null, profile);
    //         return res.status(200).json({authenticated: true, token: 'thisIsToken'});
}
));


// Call FB
// Retrieve data from FB:- FB_ID, Name, Location....
///////// Check if FB_ID exists in DB
///////// Save to MongoDB
// Push to users array.
// Send back to client.

const doesUserExist = (user) => {
    // TODO: check in DB.
    if (users[user]) return true;
    return false;
};

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.post('/login', function(req, res) {
    const account = req.body;

    if (doesUserExist && bcrypt.compareSync(account.password, users[username])) {
        console.log('Successfully login.');
        return res.status(200).json({authenticated: true, token: 'thisIsToken'});
    }

    console.log('Failed login.');
    return res.status(401).json({error: 'Failed login.'});
})
.get('*', (req, res) => {
    return res.sendFile(dirname + '/public/index.html');
})
.listen(app.get('port'),
    () => console.log('Express server listening on port ' + app.get('port'))
);

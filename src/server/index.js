import express from 'express';
import bcrypt from 'bcryptjs';
import genSalt from '../client/utils/salt';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { dirname } from '../../config';
require('dotenv').config();
import User from '../models/user';

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

// const app = express();
const app = module.exports = express();
const salt = bcrypt.genSaltSync(10);

app.set('port', process.env.PORT || 3000)
    .use(express.static(dirname + '/public'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }));

// Initialize
const username = 'phily';
const usernameSalt = genSalt(username);

const password = bcrypt.hashSync('password123', usernameSalt);
const users = {
    [username]: bcrypt.hashSync(password, salt)
};

/**
 * Mongoose
 */
const MONGODB = {
    uri: process.env.MONGODB_URI ||
        'mongodb://localhost:27017/groupthai'
};
mongoose.connect(MONGODB.uri);

/**
 * Facebook auth
 */
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

const facebookStrategy = new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: '/auth/callback/facebook',
        profileFields: ['id', 'displayName', 'first_name', 'last_name'],
        enableProof: true
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('Successfully login from facebook.');
        User.findOrCreate(profile, accessToken, function (err, user) {
            console.log('findOrCreate', err, user);
            return done(err, user);
        });
    }
);
passport.use(facebookStrategy);
passport.serializeUser(function(user, done) { // used to serialize the user for the session
    done(null, user.id);
});
passport.deserializeUser(function(id, done) { // used to deserialize the user
    User.findById(id, function(err, user){
        console.log(user);
        if(!err) done(null, user);
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
    function(req, res) {
        res.redirect('/dashboard');
    },
    // on error; likely to be something FacebookTokenError token invalid or already used token,
    // these errors occur when the user logs in twice with the same token
    function(err,req,res,next) {
        // You could put your own behavior in here, fx: you could force auth again...
        // res.redirect('/auth/facebook/');
        if(err) {
            res.status(400);
            res.render('error', {message: err.message});
        }
    }
);

app.get('/dashboard', ensureAuthenticated, function(req, res){
    console.log('path=/account, req.session.passport.user=' + req.session.passport.user);
    User.findById(req.session.passport.user, function(err, user) {
        if(err) {
            console.log(err);  // handle errors
        } else {
            res.render('account', { user: user });
        }
    });
});

function ensureAuthenticated(req, res, next) {
    console.log('req.isAuthenticated='+req.isAuthenticated())
    // console.log('req.session.passport.user='+req.session.passport.user)

    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
}

/**
 * Login endpoint
 */
const doesUserExist = (user) => {
    // TODO: check in DB.
    if (users[user]) return true;
    return false;
};

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

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

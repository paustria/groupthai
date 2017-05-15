import express from 'express';
import bcrypt from 'bcryptjs';
import session from 'express-session'
import genSalt from '../client/utils/salt';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { dirname } from '../../config';
require('dotenv').config();
import User from './models/user';

export const app = express();

app.set('port', process.env.PORT || 3000)
    .use(express.static(dirname + '/public'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));

/**
 * Mongoose
 */
const MONGODB = {
    uri: process.env.MONGODB_URI ||
        'mongodb://localhost:27017/groupthai'
};
mongoose.connect(MONGODB.uri);

/**
 * Local auth
 */
const localStrategy = new LocalStrategy(function(username, password, done) {
    User.findOne({ 'local.username' : username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
            console.log('user not found. user=',username);
            return done(null, false,{message: 'User not found.'});
        }
        if (!user.verifyPassword(password)) {
            console.log('invalid password. user=', username);
            return done(null, false, {message: 'Invalid password.'});
        }
        return done(null, user);
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
        profileFields: ['id', 'displayName', 'first_name', 'last_name', 'emails'],
        enableProof: true
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('Successfully login from facebook.');
        User.findOrCreate(profile, accessToken, function (err, user) {
            return done(err, user);
        });
    }
);

// required for passport session
// TODO use store
app.use(session({
    secret: 'secrettexthere',
    saveUninitialized: true,
    resave: true
}));

passport.use(facebookStrategy);
passport.serializeUser(function(user, done) { // used to serialize the user for the session
    // console.log(`Serialize user id= ${user.id}`);
    done(null, user.id);
});
passport.deserializeUser(function(id, done) { // used to deserialize the user
    // console.log(`Deserialize user id= ${id}`);
    User.findById(id, function(err, user){
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
        return res.status(200);
    },
    // on error; likely to be something FacebookTokenError token invalid or already used token,
    // these errors occur when the user logs in twice with the same token
    function(err,req,res,next) {
        if(err) {
            // console.log('sth wrong ', err.message);
            return res.status(400).json({message: err.message});
        }
    }
);

app.get('/profile', ensureAuthenticated, function(req, res) {
    return res.status(200).json({ user : res.user });
});

function ensureAuthenticated(req, res, next) {
    // console.log('req.session.passport.user='+req.session.passport.user)

    if (req.isAuthenticated()) { return next(); }
    return res.status(401).json({ message:"User is not authorized."});
}

/**
 * Routes
 */
require('./api/jobs');

/**
 * Login endpoint
 */
const doesUserExist = (user) => {
    // TODO: check in DB.
    if (users[user]) return true;
    return false;
};

app.post('/register', function (req, res) {
    // TODO require name and email
    const { username, password } = req.body;
    const salt = genSalt(username.toLowerCase());
    bcrypt.hash(password, salt, (err, hash) => {
        if (err)
            return res.status(500).json({ error: true });
        const user = new User({
            name: username,
            local: { username: username, password: hash }
        });
        user.save(function(err) {
            if (err) {
                console.log('Error while create new user :',err);
                return res.status(500).send('Internal Server Error.');
            }
            console.log('Create new user');
            req.login(user, function(err) {
                if (err) {
                    console.log('Error while login :',err);
                    return res.status(401).send(err);
                }
                console.log('Login Successfully');
                return res.redirect('/dashboard');
            });
        });
    });
});
app.get('/logout', function(req, res){
    // console.log("Log out ",req.user);
    req.logout();
    res.redirect('/');
});

app.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        if (req.user) {
            return res.status(200).json({authenticated: true});
        }
        else {
            return res.status(401).json({error: 'Failed login.'});
        }
    }
)
.get('*', (req, res) => {
    return res.sendFile(dirname + '/public/index.html');
})
.listen(app.get('port'),
    () => console.log('Express server listening on port ' + app.get('port'))
);

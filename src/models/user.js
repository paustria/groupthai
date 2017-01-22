// models/user.js
var mongoose = require('mongoose');

// define the schema for our user model
var userSchema = mongoose.Schema({
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String,
        username: String,
    }
});

userSchema.statics.findOrCreate = function findOrCreate(profile, token, cb){
    var thisSchema = this;

    this.findOne({ 'facebook.id': profile.id }, function(err, user) {
        if (err)
            return cb(err);
        if (user) {
            console.log('Found user.');
            return cb(null, user);
        } else {
            var newUser = new thisSchema(
                {
                    facebook: {
                        id: profile.id,
                        token: token,
                        name: profile.name.givenName + ' ' + profile.name.familyName
                    }
                }
            );

            newUser.save(function(err) {
                if (err)
                    throw err;
                return cb(null, newUser);
            });

            console.log('Created new user.');
        }
    });
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

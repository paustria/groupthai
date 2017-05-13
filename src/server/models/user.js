// models/user.js
var mongoose = require('mongoose');

// define the schema for our user model
var userSchema = mongoose.Schema({
    facebook: {
        id: String,
        token: String,
        email: String,
        username: String,
    },
    name: { type: String, required: true },
    role: {
        type: String,
        enum: ['Client', 'Manager', 'Admin'],
        default: 'Client'
    }
});

userSchema.statics.findOrCreate = function findOrCreate(profile, token, cb){
    var thisSchema = this;

    // this.findOne({ 'facebook.id': profile.id }, function(err, user) {
    //     if (err)
    //         return cb(err);
    //     if (user) {
    //         console.log('Found user.');
    //         // check if name change
    //         return cb(null, user);
    //     } else {
    //         var newUser = new thisSchema(
    //             {
    //                 facebook: {
    //                     id: profile.id,
    //                     token: token
    //                 },
    //                 name: profile.name.givenName + ' ' + profile.name.familyName
    //             }
    //         );
    //
    //         newUser.save(function(err) {
    //             if (err)
    //                 throw err;
    //             return cb(null, newUser);
    //         });
    //
    //         console.log('Created new user.');
    //     }
    // });

    var fullName = profile.name.givenName + ' ' + profile.name.familyName;
    this.findOneAndUpdate({ 'facebook.id': profile.id }, { $set:{ name: fullName } }, function(err, user) {
        // Handle the error using the Express error middleware
        if(err) return cb(err);

        // Create new user if not exists
        if(!user) {
            var newUser = new thisSchema(
                {
                    facebook: {
                        id: profile.id,
                        token: token,
                        email: (profile.emails[0].value || '').toLowerCase()
                    },
                    name: profile.name.givenName + ' ' + profile.name.familyName
                }
            );

            newUser.save(function(err) {
                if (err)
                    throw err;
                return cb(null, newUser);
            });

            console.log('Created new user.');
        }
        else {
            return cb(null, user);
        }
    });
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

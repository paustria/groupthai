// models/user.js
import mongoose from 'mongoose';

// define the schema for our user model
const userSchema = mongoose.Schema({
  facebook: {
    id: String,
    token: String,
    email: String,
    username: String,
    display_name: String,
  },
  name: { type: String, required: true },
  local: {
    username: { type: String, unique: true },
    password: String,
    email: String,
  },
  role: {
    type: String,
    enum: ['Client', 'Moderator', 'Admin'],
    default: 'Client',
  },
});

userSchema.methods.verifyPassword = function (password) {
  return password.localeCompare(this.local.password) == 0;
};

userSchema.statics.findOrCreate = function findOrCreate(profile, token, cb) {
  const ThisSchema = this;
  const fullName = `${profile.name.givenName} ${profile.name.familyName}`;

  this.findOneAndUpdate(
    { 'facebook.id': profile.id },
    { $set: { name: fullName } },
    (err, user) => {
      // Handle the error using the Express error middleware
      if (err) return cb(err);

      // Create new user if not exists
      if (!user) {
        const newUser = new ThisSchema(
          {
            facebook: {
              id: profile.id,
              token,
              email: profile.emails ?
                (profile.emails[0].value || '').toLowerCase() : '',
            },
            name: fullName,
          },
        );

        newUser.save((error) => {
          if (error) throw error;
          return cb(null, newUser);
        });

        console.log('Created new user.');
      } else {
        return cb(null, user);
      }

      return null;
    });
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

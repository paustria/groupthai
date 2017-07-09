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
  email: String,
  local: {
    username: { type: String, index: true, unique: true, sparse: true },
    password: String,
    email: String,
  },
  role: {
    type: String,
    enum: ['Client', 'Moderator', 'Admin'],
    default: 'Client',
  },
});

userSchema.methods.verifyPassword = function verifyPassword(password) {
  return password.localeCompare(this.local.password) === 0;
};

userSchema.statics.findOrCreate = function findOrCreate(profile, token, cb) {
  const ThisSchema = this;

  this.findOneAndUpdate(
    { 'facebook.id': profile.id },
    { $set: { name: profile.displayName } },
    (err, user) => {
      // Handle the error using the Express error middleware
      if (err) return cb(err);

      // Create new user if not exists
      if (!user) {
        const userEmail = profile.emails ?
          (profile.emails[0].value || '').toLowerCase() : null;
        const newUser = new ThisSchema(
          {
            facebook: {
              id: profile.id,
              token,
            },
            name: profile.displayName,
          },
        );
        if (userEmail) {
          newUser.facebook.email = userEmail;
        }

        newUser.save((error) => {
          if (error) throw error;
          console.log('Created new fb user.');
          return cb(null, newUser);
        });
      } else {
        return cb(null, user);
      }

      return null;
    });
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

//  Modified from https://github.com/elliotf/mocha-mongoose
const config = require('../../../config');
const mongoose = require('mongoose');

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
process.env.NODE_ENV = 'test';

export const connectDB = () => {
  beforeEach((done) => {
    function clearDB() {
      for (var i in mongoose.connection.collections) {
        mongoose.connection.collections[i].remove(() => {});
      }
      return done();
    }

    if (mongoose.connection.readyState === 0) {
      mongoose.connect(config.db.test, (err) => {
        if (err) {
          throw err;
        }
        return clearDB();
      });
    } else {
      return clearDB();
    }

    return true;
  });

  afterEach((done) => {
    mongoose.disconnect();
    return done();
  });
};

export const sharedSetup = () => {
  // this is for sharedSetup purpose
};

module.exports = {
  APP_ROOT: __dirname,
  APP_PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/groupthai',
  MONGO_TEST_URI: process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/groupthai_test',
};

const config = require('../config.js');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const Job = require('../src/server/models/job');

mongoose.Promise = Promise;
mongoose.connect(config.MONGO_URI);
const connection = mongoose.connection;

function done() {
  console.log('Success!');
  connection.close(() => process.exit(0));
}

/**
 * Jobs
 */
function seedJobs() {
  console.log('Seeding Jobs...');
  const categories = [
    {
      title: 'Job Title 1',
      description: 'Job description 1',
      address: {
        address1: '222 Broad ave.',
        city: 'El Segundo',
        state: 'CA',
        zipcode: '91354',
      },
      contact: {
        organizationName: 'Company name',
        name: 'Phily Austria',
        phone: '8188888888',
        email: 'phily@phily.com',
        website: 'www.phily.com',
        lineID: 'phily-line',
      },
      imgLoc: ['http://someimages.com'],
      expiredDate: 1498022889,
      createdBy: 'Phily Austria',
      updatedBy: null,
      businessCategories: ['RESTAURANT', 'NURSING'],
      isActive: true,
    },
    {
      title: 'Job Title 2',
      description: 'Job description 2',
      address: {
        address1: '222 Broad ave.',
        city: 'El Segundo',
        state: 'CA',
        zipcode: '91354',
      },
      contact: {
        organizationName: 'Company name',
        name: 'Phily Austria',
        phone: '8188888888',
        email: 'phily@phily.com',
        website: 'www.phily.com',
        lineID: 'phily-line',
      },
      imgLoc: ['http://someimages.com'],
      expiredDate: 1498022889,
      createdBy: 'Phily Austria',
      updatedBy: null,
      businessCategories: ['RESTAURANT'],
      isActive: true,
    },
    {
      title: 'Job Title 3',
      description: 'Job description 3',
      address: {
        address1: '222 Broad ave.',
        city: 'El Segundo',
        state: 'CA',
        zipcode: '91354',
      },
      contact: {
        organizationName: 'Company name',
        name: 'Phily Austria',
        phone: '8188888888',
        email: 'phily@phily.com',
        website: 'www.phily.com',
        lineID: 'phily-line',
      },
      imgLoc: ['http://someimages.com'],
      expiredDate: 1498022889,
      createdBy: 'Phily Austria',
      updatedBy: null,
      businessCategories: ['OTHERS'],
      isActive: true,
    },
  ];

  Job.insertMany(categories).then(done);
}

function onConnection() {
  console.log('Connecting to Mongo...');
  connection.db.dropDatabase(() => seedJobs());
}

connection.on('open', onConnection);

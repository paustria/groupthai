import { JOB_TYPES } from '../../shared/constants';

const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
  title: String,
  description: String,
  address: {
    address1: String,
    address2: String,
    city: String,
    state: String,
    zipcode: String,
  },
  contact: {
    organizationName: String,
    name: String,
    phone: [String],
    email: String,
    website: String,
    lineID: String,
  },
  imgLoc: [String],
  expiredDate: Number,
  createdBy: String,
  updatedBy: String,
  businessCategories: [{ type: String, enum: JOB_TYPES }],
  isActive: Boolean,
});

module.exports = mongoose.model('Job', JobSchema);

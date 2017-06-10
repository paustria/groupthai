const mongoose = require('mongoose');

// define the schema for our job posting model
const jobSchema = mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  address: {
    address_1: String,
    address_2: String,
    city: String,
    state: String,
    zipcode: Number,
    show_only_city: Boolean,
  },
  contact: {
    organization_name: String,
    name: String,
    phone: [String],
    email_address: String,
    url: String,
    line_id: String,
  },
  img_loc: [String],
  created_date: Number,
  closed_date: Number,
  created_by: String,
  business_categories: [String],
});

module.exports = mongoose.model('Job', jobSchema);

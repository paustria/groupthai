// models/jobposting.js
var mongoose = require('mongoose');

// define the schema for our job posting model
var jobPostingSchema = mongoose.Schema({
    id : Number,
    title : String,
    description : String,
    address : {
        address_1 : String,
        address_2 : String,
        city : String,
        state : String,
        zipcode : Number,
        show_only_city : Boolean
    },
    contact : {
        organization_name : String,
        name : String,
        phone : [String],
        email_address : String,
        url : String,
        line_id: String
    },
    img_loc : [String],

    created_date : Number,
    closed_date : Number,
    created_by : String,
    business_categories : [String]
});

// jobPostingSchema.statics.findOrCreate = function findOrCreate(jobPosting, cb){
//     var thisSchema = this;
//
//     this.findOne({ 'facebook.id': profile.id }, function(err, user) {
//         if (err)
//             return cb(err);
//         if (user) {
//             console.log('Found user.');
//             return cb(null, user);
//         } else {
//             var newJobPosting = new thisSchema(
//                 {
//                     facebook: {
//                         id: profile.id,
//                         token: token,
//                         name: profile.name.givenName + ' ' + profile.name.familyName
//                     }
//                 }
//             );
//
//             newJobPosting.save(function(err) {
//                 if (err)
//                     throw err;
//                 return cb(null, newJobPosting);
//             });
//
//             console.log('Created new job posting.');
//         }
//     });
// };

// create the model for users and expose it to our app
module.exports = mongoose.model('JobPosting', jobPostingSchema);

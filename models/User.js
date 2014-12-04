var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

/**
 * Static email and passwords are handled by passportLocalMongoose.
 * To see the fields and options it uses, see https://github.com/saintedlama/passport-local-mongoose
 */
var Account = new Schema({
  name: String,
  first_name: String,
  // Characterizes the user as an administrator
  is_admin: { type: Boolean, default: false },
  // Characterizes the user as an alumni member
  is_member: { type: Boolean, default: false },
  // Characterizes the user as a recruiter
  is_recruiter: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
  lastupdate: { type: Date, default: Date.now }
});

Account.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

module.exports = {
  schema: Account,
  model: mongoose.model('Account', Account)
}
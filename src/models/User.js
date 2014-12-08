var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

/**
 * Static email and passwords are handled by passportLocalMongoose.
 * To see the fields and options it uses, see https://github.com/saintedlama/passport-local-mongoose
 */
var User = new Schema({
  name: {
    first: { type: String, required: true, index: true },
    last: { type: String, required: true, index: true }
  },
  // Characterizes the user as an administrator
  is_admin: { type: Boolean, default: false },
  // Characterizes the user as an editor
  is_editor: { type: Boolean, default: false },
  // Characterizes the user as an alumni member
  is_member: { type: Boolean, default: false },
  // Characterizes the user as a recruiter
  is_recruiter: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
  lastupdate: { type: Date, default: Date.now }
});

User.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

module.exports = mongoose.model('User', User);

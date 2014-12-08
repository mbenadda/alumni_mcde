var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Offer = new Schema({
  data: {
    title: { type: String, required: true, index: true },
    tags: [ { type: String } ],
    company: { type: String, required: true },
    description: { type: String, required: true }
  },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  created: { type: Date, default: Date.now },
  lastupdate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Offer', Offer);
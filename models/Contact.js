const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
  // CREATE RELATIONSHIP WITH USER IN ORDER TO GET CONTACTS FOR A SPECIFIC USER
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  type: {
    type: String,
    default: 'personal'
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('contact', ContactSchema);
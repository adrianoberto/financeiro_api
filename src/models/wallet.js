const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  assets: {
    type: [],
    required: true,
    default: []
  },
  updated: { type: String },
  created: { type: String }
});

module.exports = mongoose.model('Wallets', schema);
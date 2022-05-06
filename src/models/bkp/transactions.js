const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  walletId: String,
  assets: {
    type: [],
    required: true,
    default: []
  },
  updated: { type: String },
  created: { type: String }
});

module.exports = mongoose.model('Transactions', schema);
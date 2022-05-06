const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  categories: [],
  updated: { type: String },
  created: { type: String }
});

module.exports = mongoose.model('stage_wallets', schema);
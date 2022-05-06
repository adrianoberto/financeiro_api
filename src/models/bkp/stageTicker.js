const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  tradingCode: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: Map,
    required: true
  },
  enabled: {
    type: Boolean
  },
  updated: { type: String },
  created: { type: String }
});

module.exports = mongoose.model('stage_tickers', schema);
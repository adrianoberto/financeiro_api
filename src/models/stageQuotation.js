const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({  
  ticker: { type: String },
  open: { type: Number },
  high: { type: Number },
  low: { type: Number },
  close: { type: Number },
  volume: { type: Number },
  date: { type: String },
  updated: { type: String }
});

module.exports = mongoose.model('stage_quotations', schema);
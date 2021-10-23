const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  shortName: {
    type: String,
    required: true,
    trim: true
  },
  cnpj: {
    type: String,
    required: true,
    trim: true
  },
  created: { type: String},
  updated: { type: String},
});

module.exports = mongoose.model('stage_stockbrokers', schema);
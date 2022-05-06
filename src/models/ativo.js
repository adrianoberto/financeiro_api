const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  type: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  updated: { type: String },
  created: { type: String }
});

module.exports = mongoose.model('irpf_ativos', schema);
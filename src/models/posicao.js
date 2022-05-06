const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  categories: { type: Map, required: true }
});

module.exports = mongoose.model('irpf_posicoes', schema);
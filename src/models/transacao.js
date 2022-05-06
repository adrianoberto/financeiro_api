const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  date: { type: String },
  type:  { type: String, required: true },
  stockbroker: { type: Map, required: true },
  ticker: { type: Map, required: true },
  amount: { type: Number, required: true },
  unitValue: { type: Number, required: true },
  totalValue: { type: Number, required: true },
});

module.exports = mongoose.model('irpf_transacoes', schema);
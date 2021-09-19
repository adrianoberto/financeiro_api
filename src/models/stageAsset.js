const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  walletId: { type: String, required: true },
  ticker: { type: Map, required: true },
  stockbroker: { type: Map, required: true },
  tags: { type: [], default: [] },
  amount: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },  
  date: { type: String }
});

module.exports = mongoose.model('stage_assets', schema);
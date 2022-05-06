const mongoose = require('mongoose');
const Stocks = mongoose.model('Stocks');

// exports.listStocks = async () => {
//     const res = await Stocks.find({}, 'tradingCode _id');    
//     return res;
// };

exports.createStock = async data => {
    const stock = new Stocks(data);
    await stock.save();
};

exports.updateStock = async (id, data) => {
    await Stocks.findByIdAndUpdate(id, {
        $set: data
    });
};

exports.deleteStock = async id => {
    await Stocks.findByIdAndDelete(id);
};
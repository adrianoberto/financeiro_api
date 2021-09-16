const mongoose = require('mongoose');
const Tickers = mongoose.model('Tickers');

exports.list = async (sort) => {
    //const res = await Stocks.find({}, 'Name -_id');

    //if(sort) {
    //    const paths = sort.split(':');
        //return await Tickers.find({}, '-_id').sort({sort});
        return await Tickers.find({}).sort({'created': 'asc'});
    //}
    //else {
    //    return await Tickers.find({}, '-_id');
    //}
};

exports.create = async data => {
    const ticker = new Tickers(data);
    await ticker.save();
};

exports.update = async (id, data) => {
    await Tickers.findByIdAndUpdate(id, {
        $set: data
    });
};

exports.delete = async id => {
    await Tickers.findByIdAndDelete(id);
};
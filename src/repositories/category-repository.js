const mongoose = require('mongoose');
const Categories = mongoose.model('Categories');

exports.list = async () => {
    return await Categories.find({}).sort({'order': 'asc'});
};

exports.create = async data => {
    const ticker = new Tickers(data);
    await ticker.save();
};
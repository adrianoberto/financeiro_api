const mongoose = require('mongoose');
const Stockbrokers = mongoose.model('Stockbrokers');

exports.list = async () => {
    //const res = await Stocks.find({}, 'Name -_id');
    const res = await Stockbrokers.find({}, '-created -cnpj');
    return res;
};

exports.create = async data => {
    const ticker = new Stockbrokers(data);
    await ticker.save();
};

exports.update = async (id, data) => {
    await Stockbrokers.findByIdAndUpdate(id, {
        $set: data
    });
};

exports.delete = async id => {
    await Stockbrokers.findByIdAndDelete(id);
};
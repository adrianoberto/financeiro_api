const mongoose = require('mongoose');
const Stagestockbrokers = mongoose.model('stage_stockbrokers');

exports.list = async () => {
    const res = await Stagestockbrokers.find({}, '-created -cnpj');
    return res;
};

exports.create = async data => {
    const ticker = new Stagestockbrokers(data);
    await ticker.save();
};

exports.update = async (id, data) => {
    await Stagestockbrokers.findByIdAndUpdate(id, {
        $set: data
    });
};

exports.delete = async id => {
    await Stagestockbrokers.findByIdAndDelete(id);
};
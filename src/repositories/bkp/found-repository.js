const mongoose = require('mongoose');
const Founds = mongoose.model('Founds');

exports.list = async () => {
    const res = await Founds.find({});
    return res;
};

exports.create = async data => {
    const stock = new Founds(data);
    await stock.save();
};

exports.update = async (id, data) => {
    await Founds.findByIdAndUpdate(id, {
        $set: data
    });
};

exports.delete = async id => {
    await Founds.findByIdAndDelete(id);
};
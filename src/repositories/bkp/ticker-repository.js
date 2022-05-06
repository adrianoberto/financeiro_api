const mongoose = require('mongoose');
const StageTickers = mongoose.model('stage_tickers');

exports.list = async (type) => {    
    return await StageTickers.find({ }, 'tradingCode _id').sort({'created': 'asc'});
};


exports.listByType = async (type) => {    
    return await StageTickers
        .find({ 
            "category.type": type?.toUpperCase(), enabled: true }, 
            "tradingCode _id category._id category.type"
        ).sort({'created': 'asc'});
};

// exports.create = async data => {
//     const ticker = new Tickers(data);
//     await ticker.save();
// };

// exports.update = async (id, data) => {
//     await Tickers.findByIdAndUpdate(id, {
//         $set: data
//     });
// };

// exports.delete = async id => {
//     await Tickers.findByIdAndDelete(id);
// };
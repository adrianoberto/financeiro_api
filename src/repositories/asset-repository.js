const mongoose = require('mongoose');
const StageAssets = mongoose.model('stage_assets');

exports.listByWalletIdAndTradingType = (walletId, tradingType) => {    
    return StageAssets.aggregate([
        {
            $match: { walletId: walletId, "ticker.category.type": tradingType }
        },
        {
            $group: {
                _id: "$ticker.tradingCode",
                avgPrice: { $avg: "$unitPrice" },
                totalPrice: { $sum: "$totalPrice" },
                amount: { $sum: "$amount"},
                events: { $push: { 
                    unitPrice: "$$ROOT.unitPrice",
                    amount: "$$ROOT.amount",
                    totalPrice: "$$ROOT.totalPrice",
                    tradingType: "$$ROOT.tradingType",
                }},
                type: { $first: "$ticker.category.type" }
            },
        },
        {
            $sort: { _id: 1 }
        }
    ]);    
};

exports.create = (data) => {
    const asset = new StageAssets(data);
    return asset.save();
};

exports.update = (id, asset) => {
    return StageAssets.findByIdAndUpdate(
        id, 
        { $set: asset }
    );
}

exports.remove = (id) => {
    return StageAssets.remove({ _id: id });
}
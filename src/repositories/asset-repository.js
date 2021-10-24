const mongoose = require('mongoose');
const StageAssets = mongoose.model('stage_assets');

exports.listByWalletIdAndTradingType = async (walletId, tradingType) => {
    var assets = await StageAssets.aggregate([
        {
            $match: { walletId: walletId, "ticker.category.type": tradingType }
        },
        {
            $group: {
                _id: "$ticker.tradingCode",
                avgPrice: { $avg: "$unitPrice" },
                totalPrice: { $sum: "$totalPrice" },
                amount: { $sum: "$amount" },
                events: {
                    $push: {
                        unitPrice: "$$ROOT.unitPrice",
                        amount: "$$ROOT.amount",
                        totalPrice: "$$ROOT.totalPrice",
                        tradingType: "$$ROOT.tradingType",
                    }
                },
                type: { $first: "$ticker.category.type" }
            },
        },
        {
            $sort: { _id: 1 }
        }
    ]).exec();

    const totalPrice = this.calculateTotalPrice(assets);

    return assets.map(asset => {
        asset.percent = this.calculatePercents(asset.totalPrice, totalPrice);
        return asset;
    });
};

exports.create = (asset) => {
    const assetData = new StageAssets(this.prepareNewAsset(asset));
    return assetData.save();
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

this.calculateTotalPrice = (assets) =>
    assets.reduce((totalPrice, asset) => totalPrice += asset.totalPrice, 0);


this.calculatePercents = (assetTotalPrice, totalPrice) =>
    ((assetTotalPrice * 100) / totalPrice).toFixed(2).replace('.', ',');


this.prepareNewAsset = (asset) => {
    return {
        walletId: asset.walletId,
        stockbroker: {
            _id: asset.stockbroker._id,
            shortName: asset.stockbroker.shortName,
        },
        ticker: {
            _id: asset.ticker._id,
            tradingCode: asset.ticker.tradingCode
        },
        tags: asset.tags || [],
        amount: asset.amount,
        unitPrice: asset.unitPrice,
        totalPrice: asset.totalPrice,
        date: asset.date
    };
}
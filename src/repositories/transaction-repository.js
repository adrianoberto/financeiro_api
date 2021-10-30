const mongoose = require('mongoose');
const Transactions = mongoose.model('stage_transactions');


exports.create = (asset) => {
    const transaction = new Transactions(this.prepareNewTransaction(asset));
    return transaction.save();
}


exports.findByWalletId = async (walletId) => {
    return await Transactions
        .find({ walletId: walletId })
        .sort({ date: -1 });
};


this.prepareNewTransaction = (asset) => {
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
        date: asset.date,
        tradingType: asset.tradingType
    };
}

// exports.listById = async (id) => {
//     return await Transactions.findById(id);
// };

// exports.findByWalletId = async (walletId) => {
//     return await Transactions.findOne({ walletId: walletId });
// };

// exports.create = async (walletId, data) => {
//     const transaction = new Transactions({
//         walletId: walletId,
//         assets: [ data ]
//     });
//     return await transaction.save();
// };

// exports.update = async (walletId, data) => {
//     const transaction = await this.findByWalletId(walletId);
//     transaction.assets = transaction.assets.map(asset => {
//         if(asset._id == data._id) {            
//             data.created = asset.created;
//             data.update = new Date();
//             asset = data;
//         }
//         return asset;
//     });

//     await Transactions.findByIdAndUpdate(transaction._id, {
//         $set: transaction
//     });
// };

// exports.delete = async (walletId, assetId) => {
//     const transaction = await this.findByWalletId(walletId);
//     transaction.assets = transaction.assets.filter(asset => asset._id != assetId);

//     await Transactions.findByIdAndUpdate(transaction._id, {
//         $set: transaction
//     });
// };

// exports.addAsset = async (id, data) => {
//     const wallet = await Transactions.findById(id);

//     if (!wallet || !data) {
//         return;
//     }

//     if (!wallet.assets) {
//         wallet.assets = [];
//     }

//     data._id = new mongoose.Types.ObjectId;

//     wallet.assets.push(data);

//     await Transactions.findByIdAndUpdate(id, {
//         $set: wallet
//     });
// };

// exports.add = async (walletId, data) => {

//     if (!data || !data.tradingType) {
//         return;
//     }

//     var transaction = await this.findByWalletId(walletId);

//     if (!transaction) {        
//         return await this.create(walletId, data);
//     }

//     transaction.assets.push(data);

//     await Transactions.findByIdAndUpdate(transaction._id, {
//         $set: transaction
//     });
// };

// exports.removeAsset = async (walletId, assetId) => {

//     const wallet = await Transactions.findById(walletId);

//     if (!wallet || !wallet.assets) {
//         return;
//     }

//     const assets = 
//         wallet.assets.filter(asset => asset._id != assetId);

//     if(wallet.assets.length == assets.length)
//     {
//         return;
//     }

//     wallet.assets =  assets;

//     await Transactions.findByIdAndUpdate(walletId, {
//         $set: wallet
//     });
// };
const mongoose = require('mongoose');
const StageAssets = mongoose.model('stage_assets');

exports.listByWalletId = (walletId) => {
    return StageAssets.find({ walletId: walletId });
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
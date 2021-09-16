const mongoose = require('mongoose');
const Wallets = mongoose.model('Wallets');
const Earnings = mongoose.model('Earnings');

exports.listById = async (id) => {
    return await Wallets.findById(id);
};

exports.totals = async (id) => {
    const wallet = await this.listById(id);

    var totalPortifolio = 0;
    wallet.assets.forEach(asset => {
        totalPortifolio += asset.totalPrice;
    });

    var totalYeild = 0
    const earnings = await Earnings.findOne({ walletId: id });
    earnings.events.forEach(event => {
        totalYeild += event.totalValue;
    });

    return {
        totalPortifolio: totalPortifolio,
        totalYeild: totalYeild
    };
};

exports.resumeStocks = async (walletId) => {

    const wallet = await this.listById(walletId) || [];
    const assets = [];

    wallet.assets.forEach(x => {
        const asset = assets.find(asset => asset.tradingCode == x.ticker.tradingCode);

        if (asset) { this.updateResumeAsset(asset, x); }
        else { this.createResumeAsset(assets, x);  }
    });

    return assets;
}

this.createResumeAsset = (assetList = [], asset) => {
    assetList.push({
        tradingCode: asset.ticker.tradingCode,
        amount: asset.amount,
        totalPrice: asset.totalPrice,
        unitPrice: asset.unitPrice,
        initialDate: asset.date,
        totalDays: this.datediff(asset.date)
    });
}

this.updateResumeAsset = (assetAlready, asset) => {
    assetAlready.amount += asset.amount;
    assetAlready.totalPrice += asset.totalPrice
    assetAlready.unitPrice = assetAlready.totalPrice / assetAlready.amount;
    if (assetAlready.initialDate > asset.date) {
        assetAlready.initialDate = asset.date;
    }
    assetAlready.totalDays = this.datediff(assetAlready.initialDate)
}

this.datediff = (date) => {
    return (Math.round((new Date()- new Date(date))/(1000*60*60*24))) -1;
}


exports.create = async data => {
    const wallet = new Wallets(data);
    return await wallet.save();
};

exports.update = async (id, data) => {
    await Wallets.findByIdAndUpdate(id, {
        $set: data
    });
};

exports.delete = async id => {
    await Wallets.findByIdAndDelete(id);
};

exports.addAsset = async (id, data) => {
    const wallet = await Wallets.findById(id);

    if (!wallet || !data) {
        return;
    }

    if (!wallet.assets) {
        wallet.assets = [];
    }

    data._id = new mongoose.Types.ObjectId;

    wallet.assets.push(data);

    await Wallets.findByIdAndUpdate(id, {
        $set: wallet
    });
};

exports.updateAsset = async (id, data) => {
    const wallet = await Wallets.findById(id);

    if (!wallet || !wallet.assets || !data) {
        return;
    }

    var updated = false;
    wallet.assets = wallet.assets.map(asset => {
        if (asset._id == data._id) {
            data.created = asset.created;
            data.update = new Date()
            asset = data;
            updated = true;
        }
        return asset;
    });

    if (updated) {
        await Wallets.findByIdAndUpdate(id, {
            $set: wallet
        });
    }
};

exports.removeAsset = async (walletId, assetId) => {

    const wallet = await Wallets.findById(walletId);

    if (!wallet || !wallet.assets) {
        return;
    }

    const assets =
        wallet.assets.filter(asset => asset._id != assetId);

    if (wallet.assets.length == assets.length) {
        return;
    }

    wallet.assets = assets;

    await Wallets.findByIdAndUpdate(walletId, {
        $set: wallet
    });
};
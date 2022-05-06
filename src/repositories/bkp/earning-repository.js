const mongoose = require('mongoose');
const Earnings = mongoose.model('Earnings');

exports.findByWalletId = async (walletId) => {
    return await Earnings.findOne({ walletId: walletId });
};

exports.filterByWalletIdAndDate = async (walletId, type, startDate, endDate) => {

    var total = 0;
    var earnings = [];
    const data = await Earnings.findOne({ walletId: walletId });

    (data.events || []).forEach(e => {
        var isValidRange = this.validateDateRange(type, startDate, endDate, e);

        if(!isValidRange) { return; }

        const earningAlready = earnings.find(earning => earning.tradingCode == e.ticker.tradingCode);
    
        if(earningAlready) { this.updateAssetEarning(earningAlready, e); }
        else { this.createAssetEarning(earnings, e) }

        total += e.totalValue;
    });

    return {
        total: total,
        earnings: earnings
    };
};

this.validateDateRange = (type, startDate, endDate, event) => {
    switch (type) {        
        case 'pg': return this.dateBetween(startDate, endDate, event.date);
        case  'ex': return this.dateBetween(startDate, endDate, event.dateEx);
        default: return true;
    }
} 

this.dateBetween = (startDate, endDate, date) => {
    if(new Date(date) < new Date(startDate)) { return false; }
    if(new Date(date) > new Date(endDate)) { return false; }
    return true;
}

this.createAssetEarning = (earningList = [], event) => {
    earningList.push({
        tradingCode: event.ticker.tradingCode,
        totalValue: event.totalValue,
        amount: 1,
        average: event.totalValue, 
        events: [{
            _id: event._id,
            type: event.type,
            stockbroker: event.stockbroker.shortName,
            amount: event.amount,
            unitValue: event.value,
            totalValue: event.totalValue,
            dateEx: event.dateEx,
            date: event.date
        }]
    });
}

this.updateAssetEarning = (eventAlready, event) => {        
        eventAlready.totalValue += event.totalValue;
        eventAlready.amount += 1;
        eventAlready.average = eventAlready.totalValue / eventAlready.amount;
        eventAlready.events.push({
            _id: event._id,
            type: event.type,
            stockbroker: event.stockbroker.shortName,
            amount: event.amount,
            unitValue: event.value,
            totalValue: event.totalValue,
            dateEx: event.dateEx,
            date: event.date
        });    
}


exports.add = async (walletId, data) => {
    
    if (!walletId) {
        throw new Error(`invalid wallet ${walletId}`);
    }

    const earning = await Earnings.findOne({ walletId: walletId });

    if (!data) {
        throw new Error(`wallet ${walletId} not found`);
    }

    data._id = new mongoose.Types.ObjectId;
    data.totalValue = data.value * data.amount;

    if (!earning) {
        await Earnings.create({
            walletId: walletId,      
            earnings: [data]
        });
        return;
    }
    
    if(!earning.events) {
        earning.events = [];
    }

    earning.events.push(data);

    await Earnings.findByIdAndUpdate(earning._id, {
        $set: earning
    });
};


exports.edit = async (walletId, data) => {
    
    if (!walletId) {
        throw new Error(`invalid wallet ${walletId}`);
    }

    const earning = await Earnings.findOne({ walletId: walletId });

    if (!data ||!earning.id) {
        throw new Error(`earning from wallet ${walletId} not found`);
    }

    console.info(data);

    earning.events.map(x=> {
        if(x._id == data._id) {
            x.ticker = data.ticker;
            x.type = data.type;
            x.stockbroker = data.stockbroker;
            x.value = data.value;
            x.totalValue = data.value * data.amount;
            x.amount = data.amount;
            x.updated = new Date();
        }
    });

    await Earnings.findByIdAndUpdate(earning._id, {
        $set: earning
    });
};

exports.delete = async (walletId, earningId) => {
    const earnings = await this.findByWalletId(walletId);    

    if (!earnings || !earnings.events) {
        return;
    }

    const events = 
        earnings.events.filter(event => event._id != earningId);

    if(earnings.events.length == events.length)
    {
        return;
    }

    earnings.events =  events;

    await Earnings.findByIdAndUpdate(earnings._id, {
        $set: earnings
    });    
};
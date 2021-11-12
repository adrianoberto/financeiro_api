db.stage_wallets.remove({});


function getTransactions(walletId, tradingType) {
    return db.stage_transactions.aggregate([
        {
            $match: { walletId: walletId, "category.type": tradingType }
        },
        {
            $group: {
                _id: "$ticker",
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
                type: { $first: "$$ROOT.category" }
            },
        },
        {
            $sort: { _id: 1 }
        }
    ]);
}


var wallet = {
    walletId:  '6071434be1db924aa0f2915d',
    categories: []
};


var categories = db.categories.find();
categories.forEach(category => {
    
    var transactions = getTransactions('6071434be1db924aa0f2915d', category.type);
    var assets = [];
    var totalPrice = 0;
    
    transactions.forEach(transaction => {
        totalPrice += transaction.totalPrice;
        var newAsset = {
            ticker: {
                _id: transaction._id._id,
                tradingCode: transaction._id.tradingCode
            },
            amount: transaction.amount,
            avgPrice: transaction.avgPrice,
            totalPrice: transaction.totalPrice,
            events: transaction.events
        };
        
        assets.push(newAsset);
    });
    
    
    category.assets = assets;
    category.totalPrice = totalPrice;
    
    wallet.categories.push(category);
});

db.stage_wallets.insert(wallet);

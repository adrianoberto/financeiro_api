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
    userId: '6071434be1db924aa0f2915d',
    name: 'Principal',
    key: 'principal',
    categories: []
};


var categories = db.categories.find();
categories.forEach(category => {
    
    var transactions = getTransactions("617f5def2c5a9f4064db68b7", category.type);
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

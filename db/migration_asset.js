// Limpa collection antes da migração
db.stage_assets.remove({})

var cursor = db.wallets.find()
var wallet = cursor.hasNext() ? cursor.next() : null;

if(wallet) {
    
    var walletId = wallet._id.str;
    
    for(var asset of wallet.assets) {
        
        var newAsset = {
            _id: asset._id,
            walletId: walletId,
            ticker: { 
                _id: asset.ticker._id,
                tradingCode: asset.ticker.tradingCode,
                category: { 
                    _id: asset.ticker.category._id,  
                    type: asset.ticker.category.type  
                }
            },
            stockbroker: { 
                _id: asset.stockbroker._id,
                shortName: asset.stockbroker.shortName
            },
            tags: asset.tags,
            amount: asset.amount,
            unitPrice: asset.unitPrice,
            totalPrice: asset.totalPrice,
            date: asset.date,
            tradingType: asset.tradingType,
        };
        
        console.log(newAsset)
        db.stage_assets.insert(newAsset);
    }
}
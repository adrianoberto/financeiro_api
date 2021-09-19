// Limpa collection antes da migração
db.stage_transactions.remove({})

var cursor = db.transactions.find()
var wallet = cursor.hasNext() ? cursor.next() : null;

if(wallet) {
    
    var walletId = wallet._id.str;
    
    for(var asset of wallet.assets) {
        
        var newTransaction = {
            _id: asset._id,
            walletId: walletId,
            ticker: { _id: asset.ticker._id },
            stockbroker: { _id: asset.stockbroker._id },
            amount: asset.amount,
            unitPrice: asset.unitPrice,
            totalPrice: asset.totalPrice,
            date: asset.date,
            tradingType: asset.tradingType,
        };
        console.log(newTransaction)
        db.stage_transactions.insert(newTransaction);
    }
}
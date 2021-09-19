// Limpa collection antes da migração
db.stage_earnings.remove({})

var cursor = db.earnings.find()
var wallet = cursor.hasNext() ? cursor.next() : null;

if(wallet) {
    
    var walletId = wallet._id.str;
    
    for(var asset of wallet.events) {
        var newTransaction = {
            _id: asset._id,
            walletId: walletId,
            ticker: { _id: asset.ticker._id },
            stockbroker: { _id: asset.stockbroker._id },
            value: asset.value,
            totalValue: asset.totalValue,
            amount: asset.amount,
            date: asset.date,
            dateEx: asset.dateEx
        };
        console.log(newTransaction)
        db.stage_earnings.insert(newTransaction);
    }
}



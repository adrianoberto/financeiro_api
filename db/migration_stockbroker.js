// Limpa collection antes da migração
db.stage_stockbrokers.remove({})

var tickers = db.stockbrokers.find();

if(tickers) {
    tickers.forEach(ticker => {
        db.stage_stockbrokers.insert(ticker);
    });
}


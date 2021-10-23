// Limpa collection antes da migração
db.stage_tickers.remove({})

var tickers = db.tickers.find();

if(tickers) {
    tickers.forEach(ticker => {
        db.stage_tickers.insert(ticker);
    });
}


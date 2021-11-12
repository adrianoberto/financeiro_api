const axios = require('axios');
const moment = require('moment');  
const mongoose = require('mongoose');
const StageQuotations = mongoose.model('stage_quotations');

exports.listByTicker = async (ticker) => {

    // var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo';

    // request.get({
    //     url: url,
    //     json: true,
    //     headers: { 'User-Agent': 'request' }
    // }, (err, res, data) => {
    //     if (err) {
    //         console.log('Error:', err);
    //     } else if (res.statusCode !== 200) {
    //         console.log('Status:', res.statusCode);
    //     } else {
    //         // data is successfully parsed as a JSON object:
    //         console.log(data);
    //     }
    // });

    // const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}.SA&interval=5min&apikey=09082CAVDO48EIYV`);

    // if(response.status == 200 && response.data["Time Series (Daily)"]) {
    //     console.log("sucesso");
    //     console.log(response.data);
    //     return response.data["Time Series (Daily)"];

    // } else {
    //     return null;
    // }

    

    

    

    var quote = await StageQuotations.findOne({ ticker: ticker.toLowerCase() });
    const currentDay = moment().format('YYYY-MM-DD');

    if(quote && quote.updated == currentDay) {      
        return quote;
    }


    const data = await this.getQuotation(ticker);

    if(!data["Meta Data"] || !data["Time Series (Daily)"]) {
        throw Error("Erro ao obter cotações");
    }

    const lastRefreshed = data["Meta Data"]["3. Last Refreshed"];

    quote = {
        ticker: ticker,
        open: data["Time Series (Daily)"][lastRefreshed]["1. open"],
        high: data["Time Series (Daily)"][lastRefreshed]["2. high"],
        low: data["Time Series (Daily)"][lastRefreshed]["3. low"],        
        close: data["Time Series (Daily)"][lastRefreshed]["4. close"],
        volume: data["Time Series (Daily)"][lastRefreshed]["5. volume"],        
        date: lastRefreshed,
        updated: currentDay
    }

    const stageQuotations = new StageQuotations(quote);
    stageQuotations.save();

    return quote;

    //moment.locale('br');
    //console.log(moment().format('YYYY-MM-DD'));

    // const quote = {
    //     updated: moment().format()
    // }
};


this.getQuotation = async (ticker) => {
    const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker.toLowerCase()}.SA&interval=5min&apikey=09082CAVDO48EIYV`);

    if(response.status == 200){
        return response.data;
    } else {
        return null;
    }
};
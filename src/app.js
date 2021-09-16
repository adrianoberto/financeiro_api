const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const stocks = require('./models/stock');
const founds = require('./models/found');
const tickers = require('./models/ticker');
const stockbrokers = require('./models/stockbroker');
const wallet = require('./models/wallet');
const category = require('./models/category');
const transaction = require('./models/transactions');
const earning = require('./models/earning');

require('dotenv').config();

// App
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {	
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");    
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

// Database
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    // useCreateIndex: true 
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
        'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});


// Load routes
const indexRoutes = require('./routes/index-routes');
const stocksRoutes = require('./routes/stock-routes');
const foundRoutes =  require('./routes/found-routes');
const tickerRoutes =  require('./routes/ticker-routes');
const stockbrokerRoutes =  require('./routes/stockbroker-routes');
const walletsRoutes =  require('./routes/wallet-routes');
const categoriesRoutes =  require('./routes/category-routes');

app.use('/', indexRoutes);
app.use('/stocks', stocksRoutes);
app.use('/founds', foundRoutes);
app.use('/tickers', tickerRoutes);
app.use('/stockbrokers', stockbrokerRoutes);
app.use('/wallets', walletsRoutes);
app.use('/categories', categoriesRoutes);

module.exports = app;

//https://woliveiras.com.br/posts/construindo-uma-api-com-node-js-parte-1-criando-e-listando-dados/
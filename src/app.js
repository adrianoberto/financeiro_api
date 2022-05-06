const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


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


// Carregar models
require('./models/corretora');
require('./models/ativo');
require('./models/transacao');
require('./models/posicao');


// importação de rotas
const indexRoutes = require('./routes/index-routes');
const corretoraRoutes = require('./routes/corretora-routes');
const ativoRoutes = require('./routes/ativo-routes');
const transacaoRoutes = require('./routes/transacao-routes');
const posicaoRoutes = require('./routes/posicao-routes');


// Configurações de rotas
app.use('/', indexRoutes);
app.use('/teste', indexRoutes);
app.use("/corretoras", corretoraRoutes);
app.use("/ativos", ativoRoutes);
app.use("/transacoes", transacaoRoutes);
app.use("/posicoes", posicaoRoutes);


// Banco de dados
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





module.exports = app;

//https://woliveiras.com.br/posts/construindo-uma-api-com-node-js-parte-1-criando-e-listando-dados/
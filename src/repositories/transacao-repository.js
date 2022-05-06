const mongoose = require('mongoose');
const transacoes = mongoose.model('irpf_transacoes');

exports.list = async (ativo) => {

    const filters = {};

    if(ativo) { filters["Ticker.Code"] = ativo; }

    return await transacoes.find(filters);
};
const mongoose = require('mongoose');
const posicoes = mongoose.model('irpf_posicoes');

exports.list = async () => {    
    return await posicoes.find({ });
};
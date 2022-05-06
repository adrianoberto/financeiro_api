const mongoose = require('mongoose');
const IrpfAtivos = mongoose.model('irpf_ativos');

exports.list = async () => {    
    return await IrpfAtivos.find({ });
};
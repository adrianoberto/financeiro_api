const mongoose = require('mongoose');
const IrpfCorretoras = mongoose.model('irpf_corretoras');

exports.list = async () => {    
    return await IrpfCorretoras.find({ });
};
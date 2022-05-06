const corretoraRepository = require('../repositories/corretora-repository');

exports.listar = () => {
    try {
        
        return corretoraRepository.list();
        
    } catch (e) {
        throw new Error(`Erro ao listar transacoes: ${e}`);
    }
};
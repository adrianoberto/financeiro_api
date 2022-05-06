const ativoRepository = require('../repositories/ativo-repository');

exports.listar = () => {
    try {
        
        return ativoRepository.list();
        
    } catch (e) {
        throw new Error(`Erro ao listar ativos: ${e}`);
    }
};
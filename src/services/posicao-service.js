const posicaoRepository = require('../repositories/posicao-repository');

exports.listar = () => {
    try {
        
        return posicaoRepository.list();
        
    } catch (e) {
        throw new Error(`Erro ao listar posicoes: ${e}`);
    }
};
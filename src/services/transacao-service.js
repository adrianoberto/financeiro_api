const transacaoRepository = require('../repositories/transacao-repository');

exports.listar = (ativo) => {
    try {

        console.log(ativo);
        
        return transacaoRepository.list(ativo);
        
    } catch (e) {
        throw new Error(`Erro ao listar transacoes: ${e}`);
    }
};
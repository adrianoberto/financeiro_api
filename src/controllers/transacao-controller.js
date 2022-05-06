const baseController = require('./base-controller');
const transacaoService = require('../services/transacao-service');

exports.listar = async (req, res) => {
    try {        

        const ativo =  req.query.ativo;

        const data =  await transacaoService.listar(ativo);
        return baseController.createResponse(res, data, 200);
    } catch (e) {
        console.log(e);
        return res.status(500).send({
            message: 'Falha ao carregar wallet'
        });
    }
};
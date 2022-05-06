const baseController = require('./base-controller');
const ativoService = require('../services/ativo-service');

exports.listar = async (req, res) => {
    try {        
        const data =  await ativoService.listar();
        return baseController.createResponse(res, data, 200);
    } catch (e) {
        console.log(e);
        return res.status(500).send({
            message: 'Falha ao carregar wallet'
        });
    }
};
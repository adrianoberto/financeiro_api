const baseController = require('./base-controller');
const posicaoService = require('../services/posicao-service');

exports.listar = async (req, res) => {
    try {        
        const data =  await posicaoService.listar();

        console.log(data);

        return baseController.createResponse(res, data, 200);
    } catch (e) {
        console.log(e);
        return res.status(500).send({
            message: 'Falha ao carregar posicao'
        });
    }
};
const baseController = require('./base-controller');
const corretoraService = require('../services/corretora-service');

exports.listar = async (req, res) => {
    try {        
        const data =  await corretoraService.listar();
        return baseController.createResponse(res, data, 200);
    } catch (e) {
        console.log(e);
        return res.status(500).send({
            message: 'Falha ao carregar wallet'
        });
    }
};
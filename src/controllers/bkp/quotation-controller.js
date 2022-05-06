const baseController = require('./base-controller');
const repository = require('../repositories/quotation-repository');

exports.listByTicker = async (req, res) => {
    try {
        const data = await repository.listByTicker(req.params.ticker);
        return baseController.createResponse(res, data || [], 200);
    } catch (e) {
        return res.status(500).send({
            message: `Falha ao carregar wallet: ${e} `
        });
    }
};
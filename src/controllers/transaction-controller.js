const baseController = require('./base-controller');
const transactionService = require('../services/transaction-service');


// create
exports.findByWalletId = async (req, res) => {

    console.log(req.params);

    try {

        var data;

        if(req?.params?.tradingCode) {
            data = await transactionService.findByWalletIdAndTradindCode(req.params.walletId, req.params.tradingCode);
        } else {
            data = await transactionService.findByWalletId(req.params.walletId);
        }

        
        return baseController.createResponse(res, data || [], 200);
    } catch (e) {        
        return res.status(500).send({
            message: e.toString()
        });
    }
};
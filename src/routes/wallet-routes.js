const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const assetController = require('../controllers/asset-controller');
const walletController = require('../controllers/wallet-controller');


//const controller = require('../controllers/wallet-controller');
//const earningController = require('../controllers/earning-controller');

// //router.get('/', controller.list);

// router.get('/:id', controller.listById);

// router.get('/:id/totals', controller.totals);

// router.get('/:walletId/resumeStocks', controller.resumeStocks);

// router.get('/:id/transactions', controller.findByWalletId);

// router.post('/', controller.create);

// router.put('/:id', controller.update);

// router.delete('/:id', controller.delete);

// router.post('/:id/assets', controller.addAsset);

// router.put('/:id/assets', controller.updateAsset);

// router.delete('/:walletId/assets/:assetId', controller.deleteAsset);

// router.get('/:walletId/earnings', earningController.findByWalletId);

// //router.get('/:walletId/earnings/', earningController.filterByWalletIdAndDate);

// router.post('/:walletId/earnings', earningController.add);

// router.put('/:walletId/earnings', earningController.edit);

// router.delete('/:walletId/earnings/:earningId', earningController.delete);


router.get('/:walletId/stocks', assetController.listByStocksWalletId);

router.get('/:walletId/fiis', assetController.listByFIIsWalletId);

router.post('/:id/assets', walletController.addAsset);

module.exports = router;
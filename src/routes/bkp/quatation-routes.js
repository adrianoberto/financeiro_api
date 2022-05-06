const express = require('express');
const router = express.Router();


const quotationController = require('../controllers/quotation-controller');


router.get('/:ticker', quotationController.listByTicker);

module.exports = router;
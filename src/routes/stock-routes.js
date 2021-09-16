const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const stocksController = require('../controllers/stock-controller');

router.get('/', stocksController.listStocks);

router.post('/', [
    check('name').isLength({min: 5, max: 7}).withMessage("O nome precisa ter no mínimo 5 caracteres."),
],stocksController.createStock);

router.put('/:id', [
    check('name').isLength({min: 5, max: 7}).withMessage("O nome precisa ter no mínimo 5 caracteres."),
],stocksController.updateStock);

router.delete('/:id', stocksController.deleteStock);

module.exports = router;
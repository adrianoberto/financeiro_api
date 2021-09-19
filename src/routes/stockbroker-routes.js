const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const controller = require('../controllers/stockbroker-controller');

// router.get('/', controller.list);

// router.post('/', [
//     check('name').isLength({min: 5, max: 7}).withMessage("O nome precisa ter no mínimo 5 caracteres."),
// ],controller.create);

// router.put('/:id', [
//     check('name').isLength({min: 5, max: 7}).withMessage("O nome precisa ter no mínimo 5 caracteres."),
// ],controller.update);

// router.delete('/:id', controller.delete);

module.exports = router;
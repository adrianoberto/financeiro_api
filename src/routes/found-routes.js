const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const foundsController = require('../controllers/found-controller');

// router.get('/', foundsController.list);

// router.post('/', [
//     check('name').isLength({min: 5, max: 7}).withMessage("O nome precisa ter no mínimo 5 caracteres."),
// ],foundsController.create);

// router.put('/:id', [
//     check('name').isLength({min: 5, max: 7}).withMessage("O nome precisa ter no mínimo 5 caracteres."),
// ],foundsController.update);

// router.delete('/:id', foundsController.delete);

module.exports = router;
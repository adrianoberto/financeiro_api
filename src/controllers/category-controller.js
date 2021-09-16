const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const repository = require('../repositories/category-repository');

// list
exports.list = async (req, res) => {
    try {
        const data = await repository.list();
        return res.status(200).send(data);
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Falha ao carregar categories' });
    }
};
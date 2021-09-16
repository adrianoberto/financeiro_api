const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const repository = require('../repositories/stock-repository');

// list
exports.listStocks = async (req, res) => {
    try {
        const data = await repository.listStocks();
        return res.status(200).send(data);
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Falha ao carregar as menções!', error: e });
    }
};

// create
exports.createStock = async (req, res) => {
    const { errors } = validationResult(req);

    if (errors.length > 0) {
        return res.status(400).send({ message: errors });
    }

    try {
        await repository.createStock({
            name: req.body.name
        });
        return res.status(201).send({ message: 'Menção cadastrada com sucesso!' });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Falha ao cadastrar a menção.' });
    }
};

// update
exports.updateStock = async (req, res) => {
    const { errors } = validationResult(req);

    if (errors.length > 0) {
        return res.status(400).send({ message: errors });
    }


    try {
        await repository.updateStock(req.params.id, req.body);
        return res.status(200).send({
            message: 'Menção atualizada com sucesso!'
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Falha ao atualizar a menção.' });
    }
};

// delete
exports.deleteStock = async (req, res) => {
    try {
        await repository.deleteStock(req.params.id);
        return res.status(200).send({
            message: 'Menção removida com sucesso!'
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Falha ao remover a menção.' });
    }
};
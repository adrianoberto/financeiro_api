const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const repository = require('../repositories/stockbroker-repository');

// list
exports.list = async (req, res) => {
    try {
        const data = await repository.list();
        return res.status(200).send(data);
    } catch (e) {
        console.log(e);
        return res.status(500).send({ 
            message: 'Falha ao carregar stockbroker' 
        });
    }
};

// create
exports.create = async (req, res) => {
    const { errors } = validationResult(req);

    if (errors.length > 0) {
        return res.status(400).send({ message: errors });
    }

    try {
        await repository.create({
            name: req.body.name
        });
        return res.status(201).send({ message: 'stockbroker cadastrada com sucesso!' });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ 
            message: 'Falha ao cadastrar stockbroker.' 
        });
    }
};

// update
exports.update = async (req, res) => {
    const { errors } = validationResult(req);

    if (errors.length > 0) {
        return res.status(400).send({ 
            message: errors 
        });
    }

    try {
        await repository.update(req.params.id, req.body);
        return res.status(200).send({
            message: 'stockbroker atualizado com sucesso!'
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ 
            message: 'Falha ao atualizar stockbrokers.' 
        });
    }
};

// delete
exports.delete = async (req, res) => {
    try {
        await repository.delete(req.params.id);
        return res.status(200).send({
            message: 'ticker removido com sucesso!'
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ 
            message: 'ticker ao remover fundo.' 
        });
    }
};
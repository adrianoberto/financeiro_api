const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const repository = require('../repositories/ticker-repository');

// list
exports.list = async (req, res) => {
    const sort = req.query.sort;

    try {
        const data = await repository.list(sort);
        return res.status(200).send(data);
    } catch (e) {
        console.log(e);
        return res.status(500).send({ 
            message: 'Falha ao carregar ticker' 
        });
    }
};

// create
exports.create = async (req, res) => {
    const { errors } = validationResult(req);

    if (errors.length > 0) {
        return res.status(400).send({ 
            message: errors 
        });
    }

    try {
        await repository.create({
            name: req.body.name
        });
        return res.status(201).send({ 
            message: 'ticker cadastrada com sucesso!' 
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ 
            message: 'Falha ao cadastrar ticker.' 
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
            message: 'ticker atualizado com sucesso!'
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ 
            message: 'Falha ao atualizar ticker.' 
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


// create
exports.teste = async (req, res) => {
    console.log(req.body.name);
    return res.status(200).send('OK');
};
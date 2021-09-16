const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const repository = require('../repositories/found-repository');

// list
exports.list = async (req, res) => {
    try {
        const data = await repository.list();
        return res.status(200).send(data);
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Falha ao carregar fundos' });
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
        return res.status(201).send({ message: 'Fundo cadastrada com sucesso!' });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Falha ao cadastrar Fundo.' });
    }
};

// update
exports.update = async (req, res) => {
    const { errors } = validationResult(req);

    if (errors.length > 0) {
        return res.status(400).send({ message: errors });
    }


    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Fundo atualizado com sucesso!'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Falha ao atualizar fundo.' });
    }
};

// delete
exports.delete = async (req, res) => {
    try {
        await repository.delete(req.params.id);
        res.status(200).send({
            message: 'Fundo removido com sucesso!'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Falha ao remover fundo.' });
    }
};
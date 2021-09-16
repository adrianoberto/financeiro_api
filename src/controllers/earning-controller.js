const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const repository = require('../repositories/earning-repository');

exports.findByWalletId = async (req, res) => {
    try {
        //const data = await repository.findByWalletId(req.params.walletId);
        const data = await repository.filterByWalletIdAndDate(req.params.walletId, req.query.type, req.query.start, req.query.end);
        return res.status(200).json(data || []);
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Falha ao carregar provento' });
    }
};

exports.filterByWalletIdAndDate = async (req, res) => {
    try {
        const data = await repository.filterByWalletIdAndDate(req.params.walletId, req.params.startDate, req.params.endDate);
        return res.status(200).json(data || []);
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Falha ao filtrar proventos' });
    }
};

exports.add = async (req, res) => {    
    try {
        await repository.add(req.params.walletId, req.body);
        
        return res.status(200).send({
            message: 'provendo adicionado com sucesso!'
        });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ 
            message: 'Falha ao adicinar provento.' 
        });
    }
};

exports.edit = async (req, res) => {    
    console.log('update');
    try {
        await repository.edit(req.params.walletId, req.body);
        
        return res.status(200).send({
            message: 'provendo editado com sucesso!'
        });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ 
            message: 'Falha ao editar provento.' 
        });
    }
};

exports.delete = async (req, res) => {
    try {
        await repository.delete(req.params.walletId, req.params.earningId);        
        return res.status(200).send({
            message: 'earning removido com sucesso!'
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ 
            message: 'Falha ao remover earning.' 
        });
    }
};
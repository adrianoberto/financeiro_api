// const mongoose = require('mongoose');
// const { validationResult } = require('express-validator');
// const walletrepository = require('../repositories/wallet-repository');
// const transactionRepository = require('../repositories/transaction-repository');
// const earningRepository = require('../repositories/earning-repository');

const baseController = require('./base-controller');


const walletService = require('../services/wallet-service');

// list by wallet id
exports.listById = async (req, res) => {
    try {
        const data = await walletService.listById(req.params.id);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).send({
            message: 'Falha ao carregar wallet'
        });
    }
};


exports.get = async (req, res) => {
    try {
        const response = await walletService.findWallet(
            req?.headers?.userid, req.params.key, req?.query?.type
        );

        return baseController.createResponse(res, response.data || [], response.code);
    } catch (e) {
        console.log(e);
        return res.status(500).send({
            message: 'Falha ao carregar wallet'
        });
    }
};



// create
exports.addAsset = async (req, res) => {

    console.log(req.body);

    try {
        const data = await walletService.addAsset(req.body);
        return res.status(201).send(data)
    } catch (e) {        
        return res.status(500).send({
            message: e.toString()
        });
    }
};


// calculate
exports.calculate = async (req, res) => {
    try {
        const data = await walletService.calculate(req.params.id);
        return res.status(200).send(data)
    } catch (e) {        
        return res.status(500).send({
            message: e.toString()
        });
    }
}




// exports.findByWalletId = async (req, res) => {
//     try {
//         const data = await transactionRepository.findByWalletId(req.params.id);
//         return res.status(200).json(data || []);
//     } catch (e) {
//         console.log(e);
//         return res.status(500).send({
//             message: 'Falha ao carregar wallet'
//         });
//     }
// };

// exports.totals = async (req, res) => {
//     try {
//         const data = await repository.totals(req.params.id);
//         return res.status(200).json(data);
//     } catch (e) {
//         console.log(e);
//         return res.status(500).send({
//             message: 'Falha ao carregar wallet'
//         });
//     }
// };

// exports.resumeStocks = async (req, res) => {
//     try {
//         const data = await repository.resumeStocks(req.params.walletId);
//         return res.status(200).json(data);
//     } catch (e) {
//         console.log(e);
//         return res.status(500).send({
//             message: 'Falha ao carregar resumo das ações'
//         });
//     }
// }

// // create
// exports.create = async (req, res) => {
//     try {
//         await repository.create({
//             name: req.body.name
//         });

//         return res.status(201).send({
//             message: 'wallet cadastrada com sucesso!'
//         });
//     } catch (e) {
//         console.log(e);
//         return res.status(500).send({
//             message: 'Falha ao cadastrar wallet.'
//         });
//     }
// };

// // update
// exports.update = async (req, res) => {
//     try {
//         await repository.update(req.params.id, req.body);
//         return res.status(200).send({
//             message: 'wallet atualizado com sucesso!'
//         });
//     } catch (e) {
//         return res.status(500).send({
//             message: 'Falha ao atualizar wallet.'
//         });
//     }
// };

// // delete
// exports.delete = async (req, res) => {
//     try {
//         await repository.delete(req.params.id);
//         return res.status(200).send({
//             message: 'wallet removido com sucesso!'
//         });
//     } catch (e) {
//         return res.status(500).send({
//             message: 'Falha ao remover wallet.'
//         });
//     }
// };

// exports.addAsset = async (req, res) => {
//     try {
//         await repository.addAsset(req.params.id, req.body);
//         await transactionRepository.add(req.params.id, req.body);

//         return res.status(200).send({
//             message: 'asset adiciona com sucesso!'
//         });
//     } catch (e) {
//         console.log(e);
//         return res.status(500).send({
//             message: 'Falha ao adicinar asset.'
//         });
//     }
// };

// exports.updateAsset = async (req, res) => {
//     try {

//         const walletId = req.params.id;
//         const asset = req.body;

//         if(asset.amount == 0) {
//             await repository.removeAsset(walletId, asset._id);
//             await transactionRepository.delete(walletId, asset._id);
//         } else if (asset.amount > 0) {
//             await repository.updateAsset(walletId, asset);
//             await transactionRepository.update(walletId, asset);
//         }

//         return res.status(200).send({
//             message: 'asset atualizado com sucesso!'
//         });
//     } catch (e) {
//         console.log(e);
//         return res.status(500).send({
//             message: 'Falha ao adicinar asset.'
//         });
//     }
// };

// exports.deleteAsset = async (req, res) => {
//     try {
//         await repository.removeAsset(req.params.walletId, req.params.assetId);
//         await transactionRepository.delete(req.params.walletId, req.params.assetId);

//         return res.status(200).send({
//             message: 'asset removido com sucesso!'
//         });
//     } catch (e) {
//         console.log(e);
//         return res.status(500).send({ 
//             message: 'Falha ao remover asset.' 
//         });
//     }
// };

// exports.addEarning = async (req, res) => {
//     try {
//         await repository.addAsset(req.params.id, req.body);
//         await transactionRepository.add(req.params.id, req.body);

//         return res.status(200).send({
//             message: 'asset adiciona com sucesso!'
//         });
//     } catch (e) {
//         console.log(e);
//         return res.status(500).send({ 
//             message: 'Falha ao adicinar asset.' 
//         });
//     }
// };
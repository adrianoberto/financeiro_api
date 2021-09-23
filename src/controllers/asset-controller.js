// const mongoose = require('mongoose');
// const { validationResult } = require('express-validator');
const repository = require('../repositories/asset-repository');

exports.listByStocksWalletId = async (req, res) => {
    try {
        const data = await repository.listByWalletIdAndTradingType(req.params.walletId, "STOCK");
        return res.status(200).json(data || []);
    } catch (e) {
        return res.status(500).send({
            message: 'Falha ao carregar wallet'
        });
    }
};

exports.listByFIIsWalletId = async (req, res) => {
    try {
        const data = await repository.listByWalletIdAndTradingType(req.params.walletId, "FII");
        return res.status(200).json(data || []);
    } catch (e) {
        return res.status(500).send({
            message: 'Falha ao carregar wallet'
        });
    }
};


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
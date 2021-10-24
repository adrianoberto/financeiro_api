const transactionRepository = require('../repositories/transaction-repository');
const assetRepository = require('../repositories/asset-repository');


// add asset to wallet
exports.addAsset = async (asset) => {
    try {
        if(!asset) { throw new Error('Stock não pode ser nulo'); }

        await transactionRepository.create(asset);
        await assetRepository.create(asset);

        return 'ativo adicionado com sucesso na carteira';
        
    } catch (e) {
        throw new Error(`Erro ao adicionar o ativo na carteira: ${e}`);
    }
};
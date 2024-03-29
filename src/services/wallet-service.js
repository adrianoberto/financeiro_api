const transactionRepository = require('../repositories/transaction-repository');
const categoryRepository = require('../repositories/category-repository');
const walletRepository = require('../repositories/wallet-repository');


exports.listById = async (userId, walletKey, tradingType) => {
    return walletRepository.listById(walletId);
}


exports.findWallet = async (userId, walletKey, tradingType) => {    

    if (userId && walletKey && tradingType) {
        return {
            code: 200,
            data: await this.listByUserIdAndKeyAndTradingType(
                userId, walletKey, tradingType)
        };
    } 

    if(userId && walletKey) {
        return {
            code: 200,
            data: await walletRepository.listByUserIdAndKey(userId, walletKey)
        }
    }

    return { code: 404, message: "Wallet is not found" }
}


this.listByUserIdAndKeyAndTradingType = async (userId, walletKey, tradingType) => {    
    return await walletRepository.listByUserIdAndTradingType(userId, walletKey, tradingType);
};


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


exports.calculate = async (walletId) => {

    var wallet = await walletRepository.listById(walletId);

    if(!wallet) {
        throw Error("wallet not found")
    }

    var totalPrice = 0;
    var categories = [];
    var assets = [];
    var availableCategories = await categoryRepository.list();

    if(!availableCategories) {
        throw Error("calculate wallet error")
    }
    
    for(var category of availableCategories) {
        totalPrice = 0;

        const transactions = await transactionRepository
            .getConsolidateTransactions(walletId, category.type);

        for(const transaction of transactions) {
            totalPrice += transaction.totalPrice;
            delete transaction.type;
            assets.push(transaction);
        }

        categories.push({
            ...category._doc,
            totalPrice: totalPrice,
            assets: assets
        });
    }
    
    wallet.categories = categories;
    await walletRepository.update(wallet);

    return true;
}
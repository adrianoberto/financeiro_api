const transactionRepository = require('../repositories/transaction-repository');

// add asset to wallet
exports.findByWalletId = (walletId) => {
    try {
        if(!walletId) { throw new Error('walletId é obrigatótrio'); }

        return transactionRepository.findByWalletId(walletId);
        
    } catch (e) {
        throw new Error(`Erro ao listar transacoes: ${e}`);
    }
};

exports.findByWalletIdAndTradindCode = (walletId, tradingCode) => {
    try {
        if(!walletId) { throw new Error('walletId é obrigatótrio'); }
        if(!tradingCode) { throw new Error('tradingCode é obrigatótrio'); }

        return transactionRepository.findByWalletIdAndTradingCode(walletId, tradingCode);
        
    } catch (e) {
        throw new Error(`Erro ao listar transacoes: ${e}`);
    }
};
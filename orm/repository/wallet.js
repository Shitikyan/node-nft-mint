const getConnection = require('../');


const getWalletRepository = async () => {
    if (this.walletRepository) return this.walletRepository;
    this.walletRepository = (await getConnection()).getRepository("Wallet");
    return this.walletRepository;
}

module.exports = getWalletRepository;

const getConnection = require('../');
const AppDataSource = require("../config/dataSource");


const getWalletRepository = async () => {
    if (this.walletRepository) return this.walletRepository;
    this.walletRepository = AppDataSource.getRepository("Wallet");
    return this.walletRepository;
}

module.exports = getWalletRepository;

const AppDataSource = require("../config/dataSource").default;


const getWalletRepository = async () => {
    if (this.walletRepository) return this.walletRepository;
    this.walletRepository = AppDataSource.getRepository("Wallet");
    return this.walletRepository;
}

module.exports = getWalletRepository;

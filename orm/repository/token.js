const AppDataSource = require("../config/dataSource");


const getTokenRepository = async () => {
    if (this.tokenRepository) return this.tokenRepository;
    this.tokenRepository = AppDataSource.getRepository("Token");
    return this.tokenRepository;
}

module.exports = getTokenRepository;

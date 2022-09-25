const AppDataSource = require("../config/dataSource").default;


const getTokenRepository = async () => {
    if (this.tokenRepository) return this.tokenRepository;
    this.tokenRepository = AppDataSource.getRepository("Token");
    return this.tokenRepository;
}

module.exports = getTokenRepository;

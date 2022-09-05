const getConnection = require('../');


const getTokenRepository = async () => {
    if (this.tokenRepository) return this.tokenRepository;
    this.tokenRepository = (await getConnection()).getRepository("Token");
    return this.tokenRepository;
}

module.exports = getTokenRepository;

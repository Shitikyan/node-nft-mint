const CONFIG = {
    db: {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "root",
        database: "pnsb",
    },

    nftFactoryContract: {
        address: "0x60a0B328BB97f7241313A3cAcB7Ad439670DF2dB",
    },

    nftContract: {
        address: "0x2b42d2feA789b2888A4D8fA5cfc4E8D4392AbcA3",
    },

    erc20FactoryContract: {
        address: "0x2858b55A297173C0C25Dbbf888F56E59974C1278",
    },

    erc20TokenContract: {
        address: "0x5D6D7e7dA153509606d08C3E20Dc84DEE7b1c0E1",
    },

    datavaultContract: {
        address: "0xE5365390A5cc7cd16A2339cD79720cD65569575c",
    },

    web3: {
        provider: "https://eth-goerli.g.alchemy.com/v2/fhoMkdYwgRymdjo6RSWu-VDBkf0CCEtC"
    }
}

module.exports = CONFIG;

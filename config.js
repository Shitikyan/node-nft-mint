const CONFIG = {
    db: {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "root",
        database: "pnsb",
    },

    factoryContract: {
        address: "0x60a0B328BB97f7241313A3cAcB7Ad439670DF2dB",
    },

    nftContract: {
        address: "0x2b42d2feA789b2888A4D8fA5cfc4E8D4392AbcA3",
    },

    web3: {
        provider: "https://eth-goerli.g.alchemy.com/v2/fhoMkdYwgRymdjo6RSWu-VDBkf0CCEtC"
    }
}

module.exports = CONFIG;

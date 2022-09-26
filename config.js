const CONFIG = {
    db: {
        type: "mysql",
        host: "localhost",
        port: 33061,
        username: "root",
        password: "root",
        database: "pnsb",
    },

    factoryContract: {
        address: "0x319318BAA4B8588d225168D4a6C14eE9619b25d6",
    },

    web3: {
        provider: "https://eth-goerli.g.alchemy.com/v2/fhoMkdYwgRymdjo6RSWu-VDBkf0CCEtC"
    }
}

module.exports = CONFIG;

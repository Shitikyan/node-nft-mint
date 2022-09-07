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
        address: "0xA24B0E1b210C4b5B1725A4E0f1EdD6E211Af9fa7",
    },

    web3: {
        provider: "https://eth-goerli.g.alchemy.com/v2/fhoMkdYwgRymdjo6RSWu-VDBkf0CCEtC"
    }
}

module.exports = CONFIG;
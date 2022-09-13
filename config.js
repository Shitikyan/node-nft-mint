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
        address: "0x857776AfffEa7E899783ba1bc928aC6af158150A",
    },

    web3: {
        provider: "https://eth-goerli.g.alchemy.com/v2/fhoMkdYwgRymdjo6RSWu-VDBkf0CCEtC"
    }
}

module.exports = CONFIG;
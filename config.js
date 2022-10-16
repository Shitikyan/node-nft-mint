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
        address: "0x5cb1e30BCc00170737bDf5f879FA3551d76953D3",
    },

    erc20TokenContract: {
        address: "0x03fA11Ec0f967eD7eC5e1cd04983f320f7479a5b",
    },

    datavaultContract: {
        address: "0xE5365390A5cc7cd16A2339cD79720cD65569575c",
    },

    web3: {
        provider: "https://eth-goerli.g.alchemy.com/v2/fhoMkdYwgRymdjo6RSWu-VDBkf0CCEtC"
    }
}

module.exports = CONFIG;

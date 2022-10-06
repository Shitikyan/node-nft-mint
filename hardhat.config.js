require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/fhoMkdYwgRymdjo6RSWu-VDBkf0CCEtC',
      accounts: ['b93a5e1b656fc411623c5a24cd06fa76f2153250e0556334216af23cd6132502']
    }
  }
};

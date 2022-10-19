const abi = require("../artifacts/contracts/DataVault.sol/DataVault.json").abi;
const Web3 = require("web3");
const CONFIG = require("../config");

const getContract = () => {
  const web3 = new Web3(CONFIG.web3.provider);
  const contract = new web3.eth.Contract(abi, CONFIG.datavaultContract.address);
  return contract;
};

module.exports = getContract;

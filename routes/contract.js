const ethers = require('ethers');
const crypto = require('crypto');
const express = require("express");
const getWalletRepository = require("../orm/repository/wallet");
const Web3 = require('web3');
const abi = require('../artifacts/contracts/Factory.sol/Factory.json').abi

const router = express.Router();

/* GET users listing. */
router.post('/', async (req, res, next) => {
    try {
        const web3 = new Web3('https://eth-goerli.g.alchemy.com/v2/fhoMkdYwgRymdjo6RSWu-VDBkf0CCEtC');
        const contractAddress = '0x807AC04E8A2B0016709BdECbae669d38Fd49Cd8B'
        const incrementer = new web3.eth.Contract(abi, contractAddress);
        const incrementTx = incrementer.methods.createContract();

        return res.send(incrementTx.encodeABI());

    } catch (err) {
        res.status(404);
        res.send({ error: true, message: err });
    }
});

module.exports = router;
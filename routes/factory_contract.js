const express = require("express");
const Web3 = require('web3');
const CONFIG = require("../config");
const abi = require('../artifacts/contracts/Factory.sol/Factory.json').abi

const tokenVerification = require('./../middleware/tokenVerification');

const router = express.Router();

// TODO changed
router.post('/', tokenVerification, async (req, res, next) => {
    try {
        const web3 = new Web3(CONFIG.web3.provider);
        const contract = new web3.eth.Contract(abi, CONFIG.factoryContract.address);

        const CONTRACT_NAME = req.body.name;
        const CONTRACT_SYMBOL = req.body.symbol;

        const token = req.authToken.token;

        const deploymentTx = contract.methods.createContract(token, CONTRACT_NAME, CONTRACT_SYMBOL);

        return res.send({
            factoryContractAddress: CONFIG.factoryContract.address,
            contracts: deploymentTx.encodeABI(),
        });
    } catch (err) {
        res.status(400);
        res.send({ error: true, message: err });
    }
});

router.get('/', tokenVerification, async (req, res, next) => {
    try {
        const web3 = new Web3(CONFIG.web3.provider);
        const contract = new web3.eth.Contract(abi, CONFIG.factoryContract.address);

        const token = req.authToken.token;

        let userContracts = await contract.methods.getUserContracts(token).call();

        return res.send(userContracts);
    } catch (err) {
        res.status(400);
        res.send({ error: true, message: err });
    }
});

module.exports = router;
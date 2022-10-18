const express = require("express");
const Web3 = require('web3');
const CONFIG = require("../config");
const abi = require('../artifacts/contracts/ERC20TokenFactory.sol/ERC20TokenFactory.json').abi
const {body, validationResult} = require('express-validator');

const tokenVerification = require('./../middleware/tokenVerification');

const router = express.Router();

router.post('/',
    tokenVerification,
    body('name').isString(),
    body('symbol').isString(),
    body('decimals').isInt({min: 0, max: 50}),
    body('max_supply').isInt({min: 1}),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({error: true, message: `${errors.array()[0].msg}. Param: ${errors.array()[0].param}`});
            }

            const web3 = new Web3(CONFIG.web3.provider);
            const contract = new web3.eth.Contract(abi, CONFIG.erc20FactoryContract.address);

            const CONTRACT_NAME = req.body.name;
            const CONTRACT_SYMBOL = req.body.symbol;
            const CONTRACT_DECIMALS = req.body.decimals;
            const CONTRACT_MAX_SUPPLY = req.body.max_supply;

            const token = req.authToken.token;

            const deploymentTx = contract.methods.createContract(token, CONTRACT_NAME, CONTRACT_SYMBOL, CONTRACT_DECIMALS, CONTRACT_MAX_SUPPLY);

            return res.send({
                factoryContractAddress: CONFIG.erc20FactoryContract.address,
                data: deploymentTx.encodeABI(),
            });
        } catch (err) {
            res.status(400).json({error: true, message: err.message});
        }
    });

router.get('/', tokenVerification, async (req, res, next) => {
    try {
        const web3 = new Web3(CONFIG.web3.provider);
        const contract = new web3.eth.Contract(abi, CONFIG.erc20FactoryContract.address);

        const token = req.authToken.token;

        let userContracts = await contract.methods.getUserContracts(token).call();

        return res.send(userContracts);
    } catch (err) {
        res.status(400);
        res.send({error: true, message: err.message });
    }
});

module.exports = router;
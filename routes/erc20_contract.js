const express = require("express");
const Web3 = require('web3');
const CONFIG = require("../config");
const abi = require('../artifacts/contracts/ERC20Token.sol/ERC20Token.json').abi
const {body, param, validationResult} = require('express-validator');
const { utils } = require('ethers')

const tokenVerification = require('./../middleware/tokenVerification');

const router = express.Router();

router.post('/mint/',
    tokenVerification,
    body('to').isString(),
    body('amount').isInt({min: 1}),
    async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({error: true, message: `${errors.array()[0].msg}. Param: ${errors.array()[0].param}`});
        }
        const web3 = new Web3(CONFIG.web3.provider);
        const contract = new web3.eth.Contract(abi);

        const to = req.body.to;
        const mintTx = contract.methods.mint(to, utils.parseEther(req.body.amount));

        return res.send({
            data: mintTx.encodeABI(),
        });
    } catch (err) {
        res.status(400);
        res.send({ error: true, message: err.message });
    }
});

router.post('/transfer-from/',
    tokenVerification,
    body('amount').isInt({ min: 1}),
    body('addressFrom').isString(),
    body('addressTo').isString(),
    async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({error: true, message: `${errors.array()[0].msg}. Param: ${errors.array()[0].param}`});
        }
        const addressTo = req.body.addressTo;
        const addressFrom = req.body.addressFrom;
        const amount = req.body.amount;

        const web3 = new Web3(CONFIG.web3.provider);
        const contract = new web3.eth.Contract(abi);

        const transferTx = contract.methods.transferFrom(addressFrom, addressTo, amount);

        return res.send({
            data: transferTx.encodeABI(),
        });
    } catch (err) {
        res.status(400);
        res.send({ error: true, message: err.message });
    }
});

router.get('/:contractAddress',
    tokenVerification,
    param('contractAddress').isString(),
    async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({error: true, message: `${errors.array()[0].msg}. Param: ${errors.array()[0].param}`});
        }
        const contractAddress = req.params.contractAddress;

        const web3 = new Web3(CONFIG.web3.provider);
        const contract = new web3.eth.Contract(abi, contractAddress);

        const owner = await contract.methods.owner().call();
        const name = await contract.methods.name().call();
        const totalSupply = await contract.methods.getTotalSupply().call();
        const symbol = await contract.methods.symbol().call();
        const decimals = await contract.methods.decimals().call();

        res.send({
            owner,
            name,
            totalSupply,
            symbol,
            decimals
        })
    } catch (err) {
        res.status(400);
        res.send({ error: true, message: err.message });
    }
})

module.exports = router;
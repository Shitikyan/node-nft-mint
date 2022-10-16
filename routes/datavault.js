const express = require("express");
const Web3 = require('web3');
const CONFIG = require("../config");
const abi = require('../artifacts/contracts/DataVault.sol/DataVault.json').abi
const {body, param, validationResult} = require('express-validator');

const tokenVerification = require('./../middleware/tokenVerification');

const router = express.Router();

router.post('/',
    tokenVerification,
    body('key').isString(),
    body('value').isString(),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({error: true, message: `${errors.array()[0].msg}. Param: ${errors.array()[0].param}`});
            }
            const web3 = new Web3(CONFIG.web3.provider);
            const contract = new web3.eth.Contract(abi);

            const key = req.body.key;
            const value = req.body.value;

            const tx = contract.methods.setVal(key, value);

            return res.send({
                data: tx.encodeABI(),
            });
        } catch (err) {
            res.status(400);
            res.send({ error: true, message: err.message });
        }
    });

router.get('/',
    tokenVerification,
    body('key').isString(),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({error: true, message: `${errors.array()[0].msg}. Param: ${errors.array()[0].param}`});
            }
            const key = req.body.key;

            const web3 = new Web3(CONFIG.web3.provider);
            const contract = new web3.eth.Contract(abi, CONFIG.datavaultContract.address);

            const value = await contract.methods.getVal(key).call();

            res.send({
                value
            })
        } catch (err) {
            res.status(400);
            res.send({ error: true, message: err.message });
        }
    })


router.delete('/',
    tokenVerification,
    body('key').isString(),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({error: true, message: `${errors.array()[0].msg}. Param: ${errors.array()[0].param}`});
            }
            const key = req.body.key;

            const web3 = new Web3(CONFIG.web3.provider);
            const contract = new web3.eth.Contract(abi);

            const tx = contract.methods.deleteVal(key);

            return res.send({
                data: tx.encodeABI(),
            });
        } catch (err) {
            res.status(400);
            res.send({ error: true, message: err.message });
        }
    })

module.exports = router;
const express = require("express");
const Web3 = require('web3');
const CONFIG = require("../config");
const abi = require('../artifacts/contracts/NFT.sol/NFT.json').abi
const {body, param, validationResult} = require('express-validator');

const tokenVerification = require('./../middleware/tokenVerification');

const router = express.Router();

router.post('/mint/',
    tokenVerification,
    body('tokenId').isNumeric(),
    body('to').isString(),
    body('uri').isString(),
    body('nftAddress').isString(),
    body('data').isString(),
    async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({error: true, message: `${errors.array()[0].msg}. Param: ${errors.array()[0].param}`});
        }
        const web3 = new Web3(CONFIG.web3.provider);
        const contract = new web3.eth.Contract(abi);

        const tokenId = req.body.tokenId;
        const to = req.body.to;
        const uri = req.body.uri;
        const nftAddress = req.body.nftAddress;
        const data = req.body.data;

        const mintTx = contract.methods.safeMint(tokenId, to, uri, nftAddress, data);

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
    body('tokenId').isNumeric(),
    body('address_from').isString(),
    body('address_to').isString(),
    async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({error: true, message: `${errors.array()[0].msg}. Param: ${errors.array()[0].param}`});
        }
        const addressFrom = req.body.address_from;
        const addressTo = req.body.address_to;
        const tokenId = req.body.token_id;

        const web3 = new Web3(CONFIG.web3.provider);
        const contract = new web3.eth.Contract(abi);

        const transferTx = contract.methods.transferFrom(addressFrom, addressTo, tokenId);

        return res.send({
            data: transferTx.encodeABI(),
        });
    } catch (err) {
        res.status(400);
        res.send({ error: true, message: err.message });
    }
});

router.get('/:contractAddress/token/:tokenId',
    tokenVerification,
    param('contractAddress').isString(),
    param('tokenId').isNumeric(),
    body('contractAddress').isLength({ max: 5 }),
    async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({error: true, message: `${errors.array()[0].msg}. Param: ${errors.array()[0].param}`});
        }
        const contractAddress = req.params.contractAddress;
        const tokenId = req.params.tokenId;

        const web3 = new Web3(CONFIG.web3.provider);
        const contract = new web3.eth.Contract(abi, contractAddress);

        const ownerAddress = await contract.methods.ownerOf(tokenId).call();
        const uri = await contract.methods.tokenURI(tokenId).call();
        const data = await contract.methods.tokenData(tokenId).call();
        const address = await contract.methods.tokenAddress(tokenId).call();

        res.send({
            'token-id': tokenId,
            uri,
            owner: ownerAddress,
            data,
            address,
        })
    } catch (err) {
        res.status(400);
        res.send({ error: true, message: err.message });
    }
})

module.exports = router;
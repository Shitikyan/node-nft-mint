const express = require("express");
const Web3 = require('web3');
const CONFIG = require("../config");
const abi = require('../artifacts/contracts/NFT.sol/NFT.json').abi

const tokenVerification = require('./../middleware/tokenVerification');

const router = express.Router();

router.post('/mint/', tokenVerification, async (req, res, next) => {
    try {
        const web3 = new Web3(CONFIG.web3.provider);
        const contract = new web3.eth.Contract(abi);

        const to = req.body.to;

        const mintTx = contract.methods.safeMint(to);

        return res.send({
            data: mintTx.encodeABI(),
        });
    } catch (err) {
        res.status(400);
        res.send({ error: true, message: err });
    }
});

router.post('/transfer-from/', tokenVerification, async (req, res, next) => {
    try {
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
        res.send({ error: true, message: err });
    }
});

router.get('/:contractAddress/token/:tokenId', tokenVerification, async (req, res, next) => {
    try {
        const contractAddress = req.params.contractAddress;
        const tokenId = req.params.tokenId;

        const web3 = new Web3(CONFIG.web3.provider);
        const contract = new web3.eth.Contract(abi, contractAddress);

        const ownerAddress = await contract.methods.ownerOf(tokenId).call();
        const baseURI = await contract.methods.getBaseURI().call();

        let uri;
        if (baseURI[baseURI.length - 1] === '/')
            uri = baseURI + tokenId;
        else
            uri = baseURI + '/' + tokenId;

        res.send({
            'token-id': tokenId,
            uri,
            owner: ownerAddress,
        })
    } catch (err) {
        res.status(400);
        res.send({ error: true, message: err });
    }
})

module.exports = router;
const express = require("express");
const Web3 = require('web3');
const CONFIG = require("../config");
const abi = require('../artifacts/contracts/NFT.sol/NFT.json').abi

const router = express.Router();

router.post('/mint/', async (req, res, next) => {
    try {
        const address = req.body.contract_address;

        const web3 = new Web3(CONFIG.web3.provider);
        const contract = new web3.eth.Contract(abi, address);

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

module.exports = router;
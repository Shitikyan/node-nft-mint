const ethers = require('ethers');
const crypto = require('crypto');
const express = require("express");
const getWalletRepository = require("../orm/repository/wallet");

const router = express.Router();

/* GET users listing. */
router.post('/', async (req, res, next) => {
    try {
        const id = crypto.randomBytes(32).toString('hex');
        const privateKey = "0x" + id;
        const wallet = new ethers.Wallet(privateKey);

        const repo = await getWalletRepository();
        const newWallet = await repo.create({
            public_key: wallet.address,
            token: req.authToken
        });
        await repo.save(newWallet);

        return res.status(200).send({
            private_key: privateKey,
            public_key: wallet.address
        });
    } catch (err) {
        res.status(400);
        res.send({ error: true, message: err });
    }
});

router.get('/', async (req, res, next) => {
    try {
        const repo = await getWalletRepository();
        const wallets = await repo.createQueryBuilder("wallet")
            .select("public_key")
            .where("wallet.tokenId = :tokenId", {tokenId: req.authToken.id})
            .execute();

        const publicKeys = wallets.map(w => w.public_key);

        return res.status(200).send(publicKeys);
    } catch (err) {
        res.status(400);
        res.send({ error: true, message: err });
    }

})

module.exports = router;
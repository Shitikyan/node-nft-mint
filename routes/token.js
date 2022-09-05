const express = require('express');
const getTokenRepository = require("../orm/repository/token");
const {Token} = require("../orm/model/token");
const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
    const token = new Token();
    token.generateTokenString();

    const repo = await getTokenRepository();

    const updatedToken = await repo.save(token);

    return res.send(Object.assign(token, updatedToken));
});

module.exports = router;

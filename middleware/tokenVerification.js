const getTokenRepository = require("../orm/repository/token");

const tokenVerification = async (req, res, next) => {
    const token = req.get('auth-token');
    if (!token) {
        return res.status(400).send({
            status: 400,
            message: "Verification token was not provided",
            error: true,
        });
    }

    const repo = await getTokenRepository();

    const result = await repo.findOne({
        where: {
            token: token,
        },
    })

    if(!result) {
        return res.status(400).send({
            status: 400,
            message: "Invalid token",
            error: true,
        });
    }

    req.authToken = result;

    next();
}

module.exports = tokenVerification;
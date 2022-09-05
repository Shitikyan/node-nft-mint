class Wallet {
    constructor(public_key, token_id) {
        this.public_key = public_key
        this.token = {
            id: token_id
        }
    }
}

module.exports = {
    Wallet: Wallet
};
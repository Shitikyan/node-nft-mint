class Token {
    constructor() {}

    generateTokenString() {
        this.token = Array(16).fill(0).map(x => Math.random().toString(36).charAt(2)).join('')
    }
}

module.exports = {
    Token: Token
};
const typeorm = require("typeorm");
const tokenSchema = require("./entity/tokenSchema");
const walletSchema = require("./entity/walletSchema");
const CONFIG = require("../config");

let connection;
const getConnection = async () => {
    if (connection)
        return connection
    connection = await typeorm.createConnection({
        type: CONFIG.db.type,
        host: CONFIG.db.host,
        port: CONFIG.db.port,
        username: CONFIG.db.username,
        password: CONFIG.db.password,
        database: CONFIG.db.database,
        synchronize: true,
        logging: false,
        entities: [
            tokenSchema,
            walletSchema
        ]
    })
    return connection;
}

module.exports = getConnection;

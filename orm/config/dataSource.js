const {DataSource} = require('typeorm');
const CONFIG = require('../../config');
const tokenSchema = require('../entity/tokenSchema');
const walletSchema = require('../entity/walletSchema');

const AppDataSource = new DataSource({
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
  ],
  migrationsTableName: "migrations",
  migrations: ["migration/*.js"],
});

AppDataSource.initialize()
  .then(async () => {
    await AppDataSource.runMigrations();
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })

module.exports = AppDataSource;

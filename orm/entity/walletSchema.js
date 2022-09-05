const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Wallet", // Will use table name `category` as default behaviour.
    tableName: "wallets", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        public_key: {
            type: "varchar",
        }
    },
    relations: {
        token: {
            type: 'many-to-one',
            target: 'Token',
            inverseSide: 'token.id',
            eager: true,
            joinColumn: 'token_id'
        }
    }
})
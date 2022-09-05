const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Token", // Will use table name `category` as default behaviour.
    tableName: "tokens", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        token: {
            type: "varchar",
        },
    },
})
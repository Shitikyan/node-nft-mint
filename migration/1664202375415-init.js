const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class init1664202375415 {
    name = 'init1664202375415'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`wallets\` (\`id\` int NOT NULL AUTO_INCREMENT, \`public_key\` varchar(255) NOT NULL, \`tokenId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`wallets\` ADD CONSTRAINT \`FK_a5d9905a95b83db61499d0c5b84\` FOREIGN KEY (\`tokenId\`) REFERENCES \`tokens\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`wallets\` DROP FOREIGN KEY \`FK_a5d9905a95b83db61499d0c5b84\``);
        await queryRunner.query(`DROP TABLE \`wallets\``);
        await queryRunner.query(`DROP TABLE \`tokens\``);
    }
}

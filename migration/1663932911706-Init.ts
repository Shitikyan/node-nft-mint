import { MigrationInterface, QueryRunner } from "typeorm"

export class Init1663932911706 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query('CREATE TABLE IF NOT EXISTS `tokens` (\n' +
          '  `id` int NOT NULL AUTO_INCREMENT,\n' +
          '  `token` varchar(255) NOT NULL,\n' +
          '  PRIMARY KEY (`id`)\n' +
          ');\n' +
          'CREATE TABLE IF NOT EXISTS `wallets` (\n' +
          '  `id` int NOT NULL AUTO_INCREMENT,\n' +
          '  `public_key` varchar(255) NOT NULL,\n' +
          '  `tokenId` int DEFAULT NULL,\n' +
          '  PRIMARY KEY (`id`),\n' +
          '  KEY `FK_a5d9905a95b83db61499d0c5b84` (`tokenId`),\n' +
          '  CONSTRAINT `FK_a5d9905a95b83db61499d0c5b84` FOREIGN KEY (`tokenId`) REFERENCES `tokens` (`id`)\n' +
          ');')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

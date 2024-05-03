import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBirthdateColumn1713980338008 implements MigrationInterface {
    name = 'AddBirthdateColumn1713980338008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "birthday" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birthday"`);
    }

}

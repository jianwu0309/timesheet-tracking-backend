import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnCountryTimesheet1658173147639 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('timesheet', new TableColumn({
            name: 'country',
            type: 'character varying',
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('timesheet', 'country');
    }

}

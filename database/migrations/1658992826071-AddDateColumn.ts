import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddDateColumn1658992826071 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('timesheet', new TableColumn({
            name: 'date',
            type: 'date',
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('timesheet', 'date');
    }

}

import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddAgencyDateColumn1659029654152 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('timesheet', new TableColumn({
            name: 'agencyDate',
            type: 'date',
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('timesheet', 'agencyDate');
    }

}

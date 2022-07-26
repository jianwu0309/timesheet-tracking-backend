import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AddTimesheetTable1657816516532 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'timesheet',
              columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'developerTime',
                    type: 'character varying',
                    isNullable: false,
                    length: '100',
                },
                {
                    name: 'developerTimezone',
                    type: 'character varying',
                    isNullable: false,
                    length: '100',
                },
                {
                    name: 'clientTime',
                    type: 'character varying',
                    isNullable: true,
                    length: '100',
                },
                {
                    name: 'clientTimezone',
                    type: 'character varying',
                    isNullable: true,
                    length: '100',
                },
                {
                    name: 'agencyTime',
                    type: 'character varying',
                    isNullable: false,
                    length: '100',
                },
                {
                    name: 'agencyTimezone',
                    type: 'character varying',
                    isNullable: false,
                    length: '100',
                },
                {
                    name: 'isActive',
                    type: 'boolean',
                    isNullable: false,
                    default: true
                },
                {
                    name: 'isDeleted',
                    type: 'boolean',
                    isNullable: false,
                    default: false
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP'
                },
              ],
            }), true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('timesheet');
    }

}

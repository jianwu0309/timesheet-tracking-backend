import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class AddTableUser1658762255167 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'users',
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
                    name: 'firstName',
                    type: 'character varying',
                    isNullable: false,
                    length: '100',
                },
                {
                    name: 'lastName',
                    type: 'character varying',
                    isNullable: false,
                    length: '100',
                },
                {
                    name: 'email',
                    type: 'character varying',
                    isNullable: false,
                    length: '100',
                },
                {
                    name: 'phoneNumber',
                    type: 'character varying',
                    isNullable: false,
                },
                {
                    name: 'password',
                    type: 'character varying',
                    isNullable: false,
                },
                {
                    name: 'lastLoginAt',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'isEmailVerified',
                    type: 'boolean',
                    isNullable: false,
                    default: true
                },
                {
                    name: 'isApproved',
                    type: 'boolean',
                    isNullable: false,
                    default: true
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
        await queryRunner.dropTable('users');
    }

}

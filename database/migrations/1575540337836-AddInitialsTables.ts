import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from 'typeorm';

export class AddInitialsTables1575540337836 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(
            new Table({
              name: 'listOfValues',
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
                  name: 'value',
                  type: 'character varying',
                  isNullable: false,
                  length: '255',
                },
                {
                    name: 'key',
                    type: 'character varying',
                    isNullable: false,
                    length: '100',
                },
                {
                  name: 'isActive',
                  type: 'boolean',
                  isNullable: false,
                  default: true,
                },
                {
                  name: 'isDeleted',
                  type: 'boolean',
                  isNullable: false,
                  default: false,
                },
              ],
            }),
        );

      await queryRunner.createTable(
          new Table({
            name: 'roles',
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
                name: 'name',
                type: 'character varying',
                isNullable: false,
                length: '255',
              },
              {
                  name: 'key',
                  type: 'character varying',
                  isNullable: false,
                  length: '100',
              },
            ],
          }), true
      );

      await queryRunner.createTable(
            new Table({
              name: 'users',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                  isNullable: false,
                  isGenerated: true,
                  generationStrategy: 'uuid',
                },
                {
                  name: 'firstName',
                  type: 'character varying',
                  isNullable: false,
                },
                {
                    name: 'lastName',
                    type: 'character varying',
                    isNullable: true,
                },
                {
                    name: 'email',
                    type: 'character varying',
                    isNullable: false,
                },
                {
                    name: 'phoneNumber',
                    type: 'character varying',
                    isNullable: false,
                    length: '100',
                },
                {
                    name: 'password',
                    type: 'character varying',
                    isNullable: false,
                },
                {
                  name: 'cnic',
                  type: 'character varying',
                  isNullable: true,
                },
                {
                  name: 'roleId',
                  type: 'int',
                },
                {
                  name: 'lastLoginAt',
                  type: 'timestamp',
                  isNullable: true,
                },
                {
                  name: 'isApproved',
                  type: 'boolean',
                  default: false
                },
                {
                  name: 'isActive',
                  type: 'boolean',
                  isNullable: false,
                  default: true,
                },
                {
                  name: 'isDeleted',
                  type: 'boolean',
                  isNullable: false,
                  default: false,
                },
                {
                  name: 'createdBy',
                  type: 'uuid',
                  isNullable: true,
                },
                {
                  name: 'updatedBy',
                  type: 'uuid',
                  isNullable: true,
                },
                {
                  name: 'createdAt',
                  type: 'timestamp',
                  isNullable: false,
                  default: 'CURRENT_TIMESTAMP',
                },
                {
                  name: 'updatedAt',
                  type: 'timestamp',
                  isNullable: true,
                  default: 'CURRENT_TIMESTAMP',
                },
              ],
            }),
            true
        );

      await queryRunner.createForeignKey('users', new TableForeignKey({
        columnNames: ['roleId'],
        referencedTableName: 'roles',
        referencedColumnNames: ['id']
      }));

      await queryRunner.createIndices('users', [
          new TableIndex({
            name: 'IDX_USERS_EMAIL',
            columnNames: ['email'],
          }),
          new TableIndex({
            name: 'IDX_USERS_PHONENO',
            columnNames: ['phoneNumber'],
          }),
          new TableIndex({
            name: 'IDX_USERS_PASSWORD',
            columnNames: ['password'],
          }),
          new TableIndex({
            name: 'IDX_USERS_ISACTIVE',
            columnNames: ['isActive'],
          }),
          new TableIndex({
            name: 'IDX_USERS_CREATEDAT',
            columnNames: ['createdAt'],
          }),
          new TableIndex({
            name: 'IDX_USERS_ROLEID',
            columnNames: ['roleId'],
          }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropTable('listOfValues');
      await queryRunner.dropTable('roles');
      await queryRunner.dropTable('users');
    }
}

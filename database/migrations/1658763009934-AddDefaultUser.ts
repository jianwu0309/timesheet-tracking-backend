import {MigrationInterface, QueryRunner} from 'typeorm';
import * as encryption from '../../src/utils/encryption';

const user: any = {
    firstName: 'Admin',
    email: 'admin@yopmail.com',
    phoneNumber: '034534556654',
    isActive: true,
    isApproved: true
};

export class AddDefaultUser1658763009934 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const passwordData = encryption.saltHashPassword('admin@123');
        await queryRunner.query(`
            insert into "users" ("firstName", "lastName", "email", "password", "phoneNumber", "isActive", "isApproved")
            values ('${user.firstName}', 'test', '${user.email}', '${passwordData}', '${user.phoneNumber}', true, true);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('delete from "users"');
    }

}

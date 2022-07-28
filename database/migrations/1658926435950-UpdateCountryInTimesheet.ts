import {MigrationInterface, QueryRunner} from 'typeorm';

export class UpdateCountryInTimesheet1658926435950 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            update timesheet
            set country = 'Other - America'
            where country = 'America'
        `);

        await queryRunner.query(`
            update timesheet
            set country = 'Other - Europe'
            where country = 'Europe'
        `);

        await queryRunner.query(`
            update timesheet
            set country = 'Other - Asia Oceania'
            where country = 'Asia Oceania'
        `);

        await queryRunner.query(`
            update timesheet
            set country = 'Other - Africa'
            where country = 'Africa'
        `);
    }

    public async down(): Promise<void> {
        // no down
    }

}

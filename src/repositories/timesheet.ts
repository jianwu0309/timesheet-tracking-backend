import { getRepository } from 'typeorm';
import { Timesheet } from '../entities/timesheet';
import { IGetRecords } from '../interfaces/timesheet';

export const getRecords = async (pagination: IGetRecords) => {
    return getRepository(Timesheet).findAndCount({
        where: {
            isActive: true
        },
        order: {
            createdAt: 'DESC'
        },
        skip: pagination.offset,
        take: pagination.limit
    });
};

export const getRecordById = async (id: number) => {
    return getRepository(Timesheet).findOne({
        where: {
            id,
            isActive: true
        },
    });
};

export const getRecordsForChart = async (countries: string[]) => {
    return getRepository(Timesheet).query(`
        select
            "timesheet"."agencyTime" as "time",
            count("timesheet"."agencyTime") as "count"
        from
            "timesheet" "timesheet"
        where
            "timesheet"."isActive" = true
            ${countries.length ? `and "timesheet".country in (${countries.map((country) => `'${country}'`).join(',')})` : ''}
        group by
            timesheet."agencyTime";
    `);
};

export const getRecordsForChartByDays = async (countries: string[]) => {
    return getRepository(Timesheet).query(`
        select
            To_Char("timesheet"."date", 'Day') as "day",
            count("timesheet"."agencyTime") as "count"
        from
            "timesheet" "timesheet"
        where
            "timesheet"."isActive" = true
            ${countries.length ? `and "timesheet".country in (${countries.map((country) => `'${country}'`).join(',')})` : ''}
        group by
            To_Char("timesheet"."date", 'Day'),
            extract(dow from "date")
        order by 
            extract(dow from "date");
    `);
};

export const saveRecord = async (payload: any) => {
    return getRepository(Timesheet).save(payload);
};

export const deleteRecord = async (id: number) => {
    return getRepository(Timesheet).delete(id);
};

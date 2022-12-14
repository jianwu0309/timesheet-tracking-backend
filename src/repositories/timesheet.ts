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
            To_Char("timesheet"."agencyDate", 'Day') as "day",
            count("timesheet"."agencyTime") as "count"
        from
            "timesheet" "timesheet"
        where
            "timesheet"."isActive" = true
            ${countries.length ? `and "timesheet".country in (${countries.map((country) => `'${country}'`).join(',')})` : ''}
        group by
            To_Char("timesheet"."agencyDate", 'Day'),
            extract(dow from "agencyDate")
        order by 
            extract(dow from "agencyDate");
    `);
};

export const getRecordsSlotsForChartByDays = async (countries: string[], day: number) => {
    return getRepository(Timesheet).query(`
        select
            "timesheet"."agencyTime" as "time",
            count("timesheet"."agencyTime") as "count"
        from
            "timesheet" "timesheet"
        where
            "timesheet"."isActive" = true
            ${countries.length ? `and "timesheet".country in (${countries.map((country) => `'${country}'`).join(',')})` : ''}
            and extract(dow from "agencyDate") = ${day}
        group by
            timesheet."agencyTime";
    `);
};

export const saveRecord = async (payload: any) => {
    return getRepository(Timesheet).save(payload);
};

export const deleteRecord = async (id: number) => {
    return getRepository(Timesheet).delete(id);
};

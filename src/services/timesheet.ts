import * as boom from '@hapi/boom';
import { IGetRecords, ISaveRecord } from '../interfaces/timesheet';
import * as timesheetRepo from '../repositories/timesheet';
import * as joiSchema from '../validations/schemas/timesheet';
import { validate } from './../validations/index';

export const getRecords = async (pagination: IGetRecords) => {
    const result = await timesheetRepo.getRecords(pagination);
    return { total: result[1], records: result[0] };
};

export const getRecordsForChart = async () => {
    const stats = await timesheetRepo.getRecordsForChart();
    return stats;
};

export const saveRecord = async (payload: ISaveRecord) => {
    await validate(payload, joiSchema.saveRecord);
    if (payload.id) {
        const record = await timesheetRepo.getRecordById(payload.id);
        if (!record) {
            throw boom.badRequest('Invalid id');
        }
    }
    return timesheetRepo.saveRecord(payload);
};

export const deleteRecord = async (id: number) => {
    await validate({ id }, joiSchema.deleteRecord);
    const record = await timesheetRepo.getRecordById(id);
    if (!record) {
        throw boom.badRequest('Invalid id');
    }
    return timesheetRepo.deleteRecord(id);
};
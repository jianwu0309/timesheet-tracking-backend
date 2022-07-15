import * as boom from '@hapi/boom';
import { ISaveRecord } from '../interfaces/timesheet';
import * as timesheetRepo from '../repositories/timesheet';
import * as joiSchema from '../validations/schemas/timesheet';
import { validate } from './../validations/index';

export const getRecords = async () => {
    return timesheetRepo.getRecords();
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
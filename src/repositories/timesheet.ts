import { getRepository } from 'typeorm';
import { Timesheet } from '../entities/timesheet';

export const getRecords = async () => {
    return getRepository(Timesheet).find({
        where: {
            isActive: true
        },
        order: {
            createdAt: 'DESC'
        }
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

export const saveRecord = async (payload: any) => {
    return getRepository(Timesheet).save(payload);
};

export const deleteRecord = async (id: number) => {
    return getRepository(Timesheet).delete(id);
};

import { Context } from 'koa';
import * as timesheetService from '../services/timesheet';

export const getRecords = async (ctx: Context, next: () => void) => {
    const pagination: any = {
        limit: ctx.request.query.limit || 20,
        offset: ctx.request.query.offset || 0,
    }
    ctx.state.data = await timesheetService.getRecords(pagination);
    await next();
};

export const getRecordsForChart = async (ctx: Context, next: () => void) => {
    ctx.state.data = await timesheetService.getRecordsForChart();
    await next();
};

export const saveRecord = async (ctx: Context, next: () => void) => {
    const payload = ctx.request.body;
    ctx.state.data = await timesheetService.saveRecord(payload);
    await next();
};

export const deleteRecord = async (ctx: Context, next: () => void) => {
    const id = ctx.params.id;
    ctx.state.data = await timesheetService.deleteRecord(id);
    await next();
};
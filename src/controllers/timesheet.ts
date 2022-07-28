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
    const countries: string[] = ctx.request.query.countries ? (ctx.request.query.countries as string).split(',') : [];
    ctx.state.data = await timesheetService.getRecordsForChart(countries);
    await next();
};

export const getRecordsForChartByDays = async (ctx: Context, next: () => void) => {
    const countries: string[] = ctx.request.query.countries ? (ctx.request.query.countries as string).split(',') : [];
    ctx.state.data = await timesheetService.getRecordsForChartByDays(countries);
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
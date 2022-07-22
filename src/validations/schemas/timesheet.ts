import * as Joi from '@hapi/joi';

export const saveRecord: Joi.Schema = Joi.object({
    id: Joi.number().optional().allow(null),
    developerTime: Joi.string().required(),
    developerTimezone: Joi.string().required(),
    clientTime: Joi.string().optional(),
    clientTimezone: Joi.number().optional(),
    agencyTime: Joi.string().required(),
    agencyTimezone: Joi.number().required(),
    country: Joi.string().optional().allow(null),
});

export const deleteRecord: Joi.Schema = Joi.object({
    id: Joi.number().required()
});

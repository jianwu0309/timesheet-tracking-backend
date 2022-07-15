import * as Joi from '@hapi/joi';

export const saveRecord: Joi.Schema = Joi.object({
    id: Joi.number().optional().allow(null),
    developerTime: Joi.string().required(),
    developerTimezone: Joi.string().required(),
    clientTime: Joi.string().required(),
    clientTimezone: Joi.number().required(),
    agencyTime: Joi.string().required(),
    agencyTimezone: Joi.number().required(),
});

export const deleteRecord: Joi.Schema = Joi.object({
    id: Joi.number().required()
});

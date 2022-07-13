import * as Joi from '@hapi/joi';

export const getUserAccounts: Joi.Schema = Joi.object({
    id: Joi.number().optional().allow(null),
    name: Joi.string().optional().allow(null, ''),
    cityId: Joi.string().optional().allow(null, ''),
    limit: Joi.number().required(),
    offset: Joi.number().required()
});

export const updateUser: Joi.Schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required().max(30),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().max(20).required(),
    companyName: Joi.string().required().max(30),
    companySizeId: Joi.number().required(),
    position: Joi.string().required().max(30),
    cityId: Joi.number().required(),
});

export const updatePreference: Joi.Schema = Joi.object({
    cityIds: Joi.array().items(Joi.number()).max(5).required(),
    isSubscribed: Joi.boolean().required()
});

export const deleteUserAccount: Joi.Schema = Joi.object({
    id: Joi.number().required()
});

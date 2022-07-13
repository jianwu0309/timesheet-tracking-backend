import * as Joi from '@hapi/joi';

export const loginSchema: Joi.Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const signUpSchema: Joi.Schema = Joi.object({
    name: Joi.string().required().max(30),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().max(20).required(),
    password: Joi.string().required(),
    companyName: Joi.string().required().max(30),
    companySizeId: Joi.number().required(),
    position: Joi.string().required().max(30),
    cityId: Joi.number().required(),
});

export const forgotSchema: Joi.Schema = Joi.object({
    email: Joi.string().email().required(),
});

export const verifyEmailSchema: Joi.Schema = Joi.object({
    email: Joi.string().email().required(),
    hash: Joi.string().required()
});

export const resetPassword: Joi.Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    hash: Joi.string().required()
});

export const changePassword: Joi.Schema = Joi.object({
    oldPassword: Joi.string().required(),
    password: Joi.string().required(),
});

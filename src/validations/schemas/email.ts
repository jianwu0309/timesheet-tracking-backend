import * as Joi from '@hapi/joi';

export const basicEmailConfiguration: Joi.Schema = Joi.object({
  to: Joi.array()
    .items(
      Joi.string()
        .required()
    )
    .min(1)
    .required()
    .label('to'),
  bcc: Joi.array()
    .items(
      Joi.string()
        .required()
    )
    .label('bcc'),
  from: Joi.string()
    .required()
    .label('from'),
});

export const sesEmailConfiguration: Joi.Schema = Joi.object({
  subject: Joi.string()
    .required()
    .label('subject'),
  body: Joi.string()
    .required()
    .label('body'),
});

export const emailConfiguration: Joi.Schema = Joi.object({
  subject: Joi.string()
    .required()
    .label('subject'),
  template: Joi.string()
    .required()
    .label('template'),
  dataMap: Joi.any(),
});

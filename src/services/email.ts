import * as Boom from '@hapi/boom';
import * as joiSchema from '../validations/schemas/email';
import * as mustache from 'mustache';
import * as nodemailer from 'nodemailer';
import { validate } from '../validations/index';
import {
  IEmailConfiguration,
  IWelcomeEmail,
} from '../interfaces/email';
import config from '../../config';
import { TEMPLATE_FILE } from '../constants/file';
import { EMAIL_TEMPLATES } from '../constants/email';

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.secure, // true for 465, false for other ports
  auth: {
    user: config.email.user, // generated ethereal user
    pass: config.email.password, // generated ethereal password
  },
});

const sendEmail = async (emailConfiguration: IEmailConfiguration): Promise<any> => {
  await validate(emailConfiguration, {
    ...joiSchema.basicEmailConfiguration,
    ...joiSchema.emailConfiguration,
  });
  if (!TEMPLATE_FILE[emailConfiguration.template]) {
    throw Boom.notFound('error.email.not_found');
  }

  const emailBody = mustache.render(
    TEMPLATE_FILE[emailConfiguration.template],
    emailConfiguration.dataMap,
    {
      footer: TEMPLATE_FILE['footer'],
    },
  );
  emailConfiguration.subject = mustache.render(
    emailConfiguration.subject,
    emailConfiguration.dataMap,
  );

  await transporter.sendMail({
    to: emailConfiguration.to,
    bcc: emailConfiguration.bcc,
    from: emailConfiguration.from,
    html: emailBody,
    subject: emailConfiguration.subject,
  });
  return { success: true };
};

export const sendWelcomeEmail = async (payload: IWelcomeEmail): Promise<any> => {
  // const hash = await generateAndCacheUnsubscribeHash(payload.email);
  return sendEmail({
    dataMap: {
      firstName: payload.firstName,
      lastName: payload.lastName,
      link: `${config.server.frontendURL}/auth/verify-email?email=${encodeURIComponent(payload.email)}&hash=${
        payload.hash
      }`,
    },
    from: `"Zero Bench Time" <${config.email.user}>`,
    to: [payload.email],
    subject: EMAIL_TEMPLATES.welcome.subject,
    template: EMAIL_TEMPLATES.welcome.template,
  });
};

export const sendForgotPasswordEmail = async (payload: any): Promise<any> => {
  return sendEmail({
    dataMap: {
      action: `${config.server.frontendURL}/auth/reset-password?email=${encodeURIComponent(payload.email)}&hash=${
        payload.hash
      }`,
    },
    from: `"Zero Bench Time" <${config.email.user}>`,
    to: [payload.email],
    subject: EMAIL_TEMPLATES.forgotPassword.subject,
    template: EMAIL_TEMPLATES.forgotPassword.template,
  });
};

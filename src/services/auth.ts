import * as boom from '@hapi/boom';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import config from '../../config';

import * as joiSchema from '../validations/schemas/auth';
import * as userRepo from '../repositories/user';
import * as emailService from './email';
import * as encryption from '../utils/encryption';
import { validate } from './../validations/index';
import { ILoginRequest, IAuthResponse, ISignUpRequest, IChangePassword, IResetPassword } from '../interfaces/auth';
import { User } from './../entities/user';
import { throwErrorIfListOfValueNotExist } from '../validations/list-of-value';
import { ListOfValues } from '../enum/list-of-value';

export const login = async (payload: ILoginRequest): Promise<IAuthResponse> => {
    await validate(payload, joiSchema.loginSchema);
    const encryptedPassword: any = encryption.saltHashPassword(payload.password);
    const user = await userRepo.authenticate(payload.email.toLowerCase(), encryptedPassword);
    if (!user) {
      throw boom.badRequest('Incorrect Username or Password');
    }
    const toSaveUser = {
      id: user.id,
      lastLoginAt: new Date()
    };
    await userRepo.saveUser(toSaveUser);
    return generateTokenAndAuthResponse(user);
};

export const signUp = async (payload: ISignUpRequest): Promise<IAuthResponse | any> => {
  await validate(payload, joiSchema.signUpSchema, { allowUnknown: true });
  const user = await userRepo.findByEmail(payload.email.toLowerCase());
  if (user) {
    return { success: false, emailNotAvailable: true };
  }
  await throwErrorIfListOfValueNotExist(payload.companySizeId, ListOfValues.COMPANY_SIZE);
  const encryptedPassword = encryption.saltHashPassword(payload.password);
  const toSaveUser = {
    firstName: payload.name.toLowerCase(),
    phoneNumber: payload.phoneNumber,
    email: payload.email.toLowerCase(),
    password: encryptedPassword,
    timezone: payload.timezone,
    isAdmin: false,
    isApproved: false
  };
  const savedUser = await userRepo.saveUser(toSaveUser);
  await sendVerificationEmail(payload.email);
  return generateTokenAndAuthResponse(savedUser);
};

const generateTokenAndAuthResponse = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      isAdmin: user.isAdmin,
      isEmailVerified: user.isEmailVerified
    },
    config.server.tokenSecret,
    { expiresIn: config.server.tokenExpiry },
  );
  const response: IAuthResponse = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    isApproved: user.isApproved,
    accessToken: token,
    isAdmin: user.isAdmin,
    isEmailVerified: user.isEmailVerified,
  };
  return response;
};

const sendVerificationEmail = async (email: string) => {
  const hash = encryption.createHash(JSON.stringify({
    email,
    time: Date.now()
  }));
  await emailService.sendWelcomeEmail({
    firstName: '',
    lastName: '',
    email,
    hash
  });
};

export const resendVerificationEmail = async (email: string) => {
  const user = await userRepo.findByEmail(email);
  if (!user) {
    throw boom.badRequest('User does not exist');
  }
  if (user.isEmailVerified) {
    throw boom.badRequest('Email is already verified');
  }
  await sendVerificationEmail(email);
  return { success: true, message: 'Verification email has been sent!' };
};

export const changePassword = async (userId: number, payload: IChangePassword) => {
  await validate(payload, joiSchema.changePassword);
  const user = await userRepo.findById(userId);
  if (!user) {
    throw boom.badRequest('Invalid email');
  }
  const encryptedOldPassword = encryption.saltHashPassword(payload.oldPassword);
  if (encryptedOldPassword !== user.password) {
    throw boom.badRequest('Invalid old password');
  }
  if (payload.oldPassword === payload.password) {
    throw boom.badRequest('Old password and New password should not be same');
  }
  const encryptedNewPassword = encryption.saltHashPassword(payload.password);
  const toSaveUser = {
    id: user.id,
    password: encryptedNewPassword,
  };
  await userRepo.saveUser(toSaveUser);
  return { success: true, message: 'Password has been changed' };
};

export const forgotPassword = async (email: string) => {
  await validate({ email }, joiSchema.forgotSchema);
  const user = await userRepo.findByEmail(email);
  const hash = encryption.createHash(JSON.stringify({
    email,
    time: Date.now()
  }));
  if (!user) {
    return { success: true, message: 'Please check your email to proceed further' };
  }
  await sendForgotEmail(email, hash);
  return { success: true, message: 'Please check your email to proceed further' };
};

const sendForgotEmail = async (email: string, hash: string) => {
  await emailService.sendForgotPasswordEmail({
    email,
    hash
  });
};

export const verifyHash = async (email: string, hash: string, verifyEmail: boolean = false) => {
  await validate({ email, hash }, joiSchema.verifyEmailSchema);
  checkExpiryOfHash(hash, email);
  if (verifyEmail) {
    const user = await userRepo.findByEmail(email);
    if (!user) {
      throw boom.badRequest('User not found');
    }
    await userRepo.saveUser({ id: user.id, isEmailVerified: true });
    return { success: true, isEmailVerified: true };
  }
  return { success: true };
};

export const resetPassword = async (payload: IResetPassword) => {
  await validate(payload, joiSchema.resetPassword);
  checkExpiryOfHash(payload.hash, payload.email);
  const user = await userRepo.findByEmail(payload.email);
  if (!user) {
    throw boom.badRequest('Invalid email');
  }
  const encryptedPassword = encryption.saltHashPassword(payload.password);
  const toSaveUser: any = {
    id: user.id,
    password: encryptedPassword,
  };
  await userRepo.saveUser(toSaveUser);
  return { success: true, message: 'Password has been reset' };
};

const checkExpiryOfHash = (hash: string, email: string) => {
  let decryptedHash = '';
  try {
    decryptedHash = encryption.decryptHash(hash);
  } catch (e) {
    throw boom.badRequest('Invalid hash');
  }
  const decryptedData = JSON.parse(decryptedHash);
  if (moment(decryptedData.time).add(config.server.resetHashExpiry, 'h') < moment()) {
    throw boom.badRequest('Url has expired');
  }
  if (decryptedData.email !== email) {
    throw boom.badRequest('Invalid email');
  }
};

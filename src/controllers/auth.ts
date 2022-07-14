import { Context } from 'koa';
import { ILoginRequest, ISignUpRequest, IChangePassword, IResetPassword } from '../interfaces/auth';
import * as authService from '../services/auth';

export const login = async (ctx: Context, next: () => void) => {
  const payload: ILoginRequest = ctx.request.body;
  ctx.state.data = await authService.login(payload);
  await next();
};

export const signUp = async (ctx: Context, next: () => void) => {
  const payload: ISignUpRequest = ctx.request.body;
  ctx.state.data = await authService.signUp(payload);
  await next();
};

export const changePassword = async (ctx: Context, next: () => void) => {
  const payload: IChangePassword = {
    oldPassword: ctx.request.body.oldPassword,
    password: ctx.request.body.password,
  };
  const userId: number = ctx.state.user.id;
  ctx.state.data = await authService.changePassword(userId, payload);
  await next();
};

export const forgotPassword = async (ctx: Context, next: () => void) => {
  const email: string = ctx.request.body.email;
  ctx.state.data = await authService.forgotPassword(email);
  await next();
};

export const verifyHash = async (ctx: Context, next: () => void) => {
  const email: string = ctx.request.body.email;
  const hash: string = ctx.request.body.hash;
  const verifyEmail: boolean = ctx.request.body.verifyEmail || false;
  ctx.state.data = await authService.verifyHash(email, hash, verifyEmail);
  await next();
};

export const resetPassword = async (ctx: Context, next: () => void) => {
  const payload: IResetPassword = {
    email: ctx.request.body.email,
    password: ctx.request.body.password,
    hash: ctx.request.body.hash
  };
  ctx.state.data = await authService.resetPassword(payload);
  await next();
};

export const resendVerificationEmail = async (ctx: Context, next: () => void) => {
  const email: string = ctx.request.body.email;
  ctx.state.data = await authService.resendVerificationEmail(email);
  await next();
};

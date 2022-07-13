import * as boom from '@hapi/boom';
import * as jwt from 'jsonwebtoken';
import { Context } from 'koa';
import config from '../../config';
import * as userRepo from '../repositories/user';

const authentication = (onlyAdmin = false, forCron = false, throwError = true) => {
  return async (ctx: Context, next: () => void) => {
    const token = ctx.header.authorization;
    if (!token) {
      if (throwError) {
        throw boom.unauthorized();
      }
    } else if (forCron) {
      if (token !== config.server.accessKey) {
        throw boom.unauthorized();
      }
    } else {
        try {
          const decoded: any = jwt.verify(token, config.server.tokenSecret);
          if (onlyAdmin && !decoded.isAdmin) {
            throw boom.unauthorized();
          }
          ctx.state.user = await userRepo.findById(decoded.id);
          if (!ctx.state.user.isEmailVerified) {
            throw boom.unauthorized();
          }
          ctx.state.user.accountId = decoded.accountId;
        } catch (e) {
          if (throwError) {
            throw boom.unauthorized();
          }
        }
    }
    await next();
  };
};

export default authentication;

import * as Koa from 'koa';
import * as helmet from 'koa-helmet';
import * as koaBody from 'koa-body';
import * as mount from 'koa-mount';
import * as cors from 'koa2-cors';
import * as rateLimit from 'koa2-ratelimit';
import * as jsonMiddleware from 'koa-json';
import * as staticServe from 'koa-static-server';
import * as compress from 'koa-compress';
import * as path from 'path';
import config from '../config';

import { Logger } from './utils/logger';
import { bootstrap } from './bootstrap/index';
// tslint:disable-next-line
const basicAuth = require('koa-basic-auth');

// middlewares
import routeMiddleware from './routes/index';
import errorMiddleware from './middlewares/error';
import responseMiddleware from './middlewares/response';

const logger = new Logger('timesheet-track-api').createLogger();

const limiter = rateLimit.RateLimit.middleware({
  interval: { min: 5 }, // 5 minutes = 15*60*1000
  max: 500, // limit each IP to 100 requests per interval
});

const whitelist = [
  'http://localhost:4200',
  'http://localhost:3000',
];

function checkOriginAgainstWhitelist(ctx: Koa.Context) {
  const requestOrigin = (ctx.request.headers.origin || ctx.request.origin) as string;
  if (!whitelist.includes(requestOrigin)) {
    return ctx.throw(403, `${requestOrigin} is not a valid origin`);
  }
  return requestOrigin;
}

const docPath = path.join(__dirname, '../doc');

bootstrap()
  .then(() => {
    const app = new Koa();
    app.use(Logger.koa(logger));
    app.use(helmet());
    app.use(
      mount(
        '/api/docs',
        basicAuth({ name: config.apiDocs.username, pass: config.apiDocs.password }),
      ),
    );
    app.use(staticServe({ rootDir: docPath, rootPath: '/api/docs' }));
    app.use(
      koaBody({
        jsonLimit: '10mb',
        formLimit: '50mb',
        formidable: {
          maxFileSize: 500 * 1024 * 1024, //  500 mb
        },
        multipart: true,
        json: true,
        onError(err, context) {
          context.throw(new Error(err.message), 400);
        },
      }),
    );
    app.use(
      cors({
        origin: '*',
        allowMethods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
      }),
    );
    // Rate Limit: apply to all requests
    app.use(limiter);
    app.use(compress());
    app.use(errorMiddleware());
    app.use(jsonMiddleware());
    app.use(routeMiddleware());
    app.use(responseMiddleware());

    app.listen(config.server.port, () => {
      console.info('server started on port %d', config.server.port);
    });

    app.on('error', err => {
      console.error('server error', err);
    });
  })
  .catch(err => {
    logger.fatal(err);
  });

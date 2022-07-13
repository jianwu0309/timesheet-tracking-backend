import * as compose from 'koa-compose';
import * as Router from 'koa-router';
import ping from './ping';
import auth from './auth';

const router = new Router();
const routes = router.routes();
const routesToExport = [
    routes,
    ping,
    auth,
];

export default () => compose(routesToExport);

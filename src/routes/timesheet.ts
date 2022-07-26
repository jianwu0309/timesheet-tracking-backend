import * as Router from 'koa-router';

import * as ctrl from '../controllers/timesheet';
import authorization from '../middlewares/authentication';

const router = new Router({
  prefix: `/api/timesheet`,
});

router.use(authorization());

router.get('/', ctrl.getRecords);

router.get('/stats', ctrl.getRecordsForChart);

router.post('/', ctrl.saveRecord);

router.delete('/:id', ctrl.deleteRecord);

export default router.routes();

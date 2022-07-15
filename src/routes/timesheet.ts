import * as Router from 'koa-router';

import * as ctrl from '../controllers/timesheet';

const router = new Router({
  prefix: `/api/timesheet`,
});

router.get('/', ctrl.getRecords);

router.post('/', ctrl.saveRecord);

router.delete('/:id', ctrl.deleteRecord);

export default router.routes();

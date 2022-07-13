import * as Router from 'koa-router';

import * as ctrl from '../controllers/auth';
import authentication from '../middlewares/authentication';

const router = new Router({
  prefix: `/api/auth`,
});

router.post('/login', ctrl.login);

router.post('/sign-up', ctrl.signUp);

router.put('/change-password', authentication(false), ctrl.changePassword);

router.post('/forgot-password', ctrl.forgotPassword);

router.post('/verify-hash', ctrl.verifyHash);

router.put('/reset-password', ctrl.resetPassword);

router.post('/resend-verification', ctrl.resendVerificationEmail);

export default router.routes();

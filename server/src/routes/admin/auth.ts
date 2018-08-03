import * as Router from 'koa-router';
import { auth } from 'controllers';

const router = new Router({ prefix: '/auth' });

router.post('/sign-in', auth.signIn);
router.post('/refresh-token', auth.refreshToken);
router.post('/forgot-password', auth.forgotPassword);

export default router;

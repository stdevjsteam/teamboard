import * as Router from 'koa-router';
import { auth } from 'controllers';

const router = new Router({ prefix: '/auth' });

router.post('/sign-in', auth.signIn);
router.post('/refresh-token', auth.refreshToken);
router.post('/reset-password', auth.resetPassword);

export default router;

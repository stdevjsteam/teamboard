import * as Router from 'koa-router';
import { invitations } from 'controllers';

const router = new Router({ prefix: '/invitations' });

router.post('check-code', invitations.checkCode);
router.post('/confirm', invitations.confirm);

export default router;

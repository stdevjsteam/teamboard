import * as Router from 'koa-router';
import { invitations } from 'controllers';

const router = new Router({ prefix: '/invitations' });

router.post('/send-code', invitations.sendCode);

export default router;

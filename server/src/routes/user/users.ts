import * as Router from 'koa-router';
import { users } from 'controllers';

const router = new Router({ prefix: '/users' });

router.post('/edit-profile', users.editProfile);

export default router;

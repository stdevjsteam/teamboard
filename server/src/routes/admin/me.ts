import * as Router from 'koa-router';
import { me } from 'controllers';

const router = new Router({ prefix: '/me' });

router.get('/', me.fetch);

export default router;

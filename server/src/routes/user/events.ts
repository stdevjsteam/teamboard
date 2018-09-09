import * as Router from 'koa-router';
import { events } from 'controllers';

const router = new Router({ prefix: '/events' });

router.get('/', events.fetchAll__USER);
router.get('/:id', events.fetchById__USER);

export default router;

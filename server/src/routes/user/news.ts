import * as Router from 'koa-router';
import { news } from 'controllers';

const router = new Router({ prefix: '/news' });

router.get('/', news.fetchAll__USER);
router.get('/:id', news.fetchById__USER);

export default router;

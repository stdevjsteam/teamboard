import * as Router from 'koa-router';
import { interestingToKnows } from 'controllers';

const router = new Router({ prefix: '/interesting-to-knows' });

router.get('/', interestingToKnows.fetchAll__USER);
router.get('/:id', interestingToKnows.fetchById__USER);

export default router;

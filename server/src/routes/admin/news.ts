import * as Router from 'koa-router';
import { news } from 'controllers';

const router = new Router({ prefix: '/news' });

router.get('/', news.fetchAll);
router.post('/', news.create);
router.get('/:id', news.fetchById);
router.patch('/', news.updateById);
router.delete('/', news.deleteById);

export default router;

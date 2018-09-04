import * as Router from 'koa-router';
import { news } from 'controllers';

const router = new Router({ prefix: '/news' });

router.get('/', news.fetchAll);
router.post('/', news.create);
router.get('/:id', news.fetchById);
router.patch('/:id', news.updateById);
router.delete('/:id', news.deleteById);

export default router;

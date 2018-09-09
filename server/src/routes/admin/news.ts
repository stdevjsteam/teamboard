import * as Router from 'koa-router';
import { news } from 'controllers';

const router = new Router({ prefix: '/news' });

router.get('/', news.fetchAll__ADMIN);
router.post('/', news.create);
router.get('/:id', news.fetchById__ADMIN);
router.patch('/:id', news.updateById);
router.delete('/:id', news.deleteById);
router.post('/:id/add-groups', news.addGroups);
router.post('/:id/delete-groups', news.deleteGroups);

export default router;

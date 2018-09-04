import * as Router from 'koa-router';
import { groups } from 'controllers';

const router = new Router({ prefix: '/groups' });

router.get('/', groups.fetchAll);
router.get('/:id', groups.fetchById);
router.post('/', groups.create);
router.patch('/:id', groups.updateById);
router.delete('/:id', groups.deleteById);
router.post('/:id/add-members', groups.addMembers);
router.post('/:id/delete-members', groups.deleteMembers);

export default router;

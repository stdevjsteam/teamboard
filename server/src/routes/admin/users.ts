import * as Router from 'koa-router';
import { users } from 'controllers';

const router = new Router({ prefix: '/users' });

router.get('/', users.fetchAll);
router.get('/:id', users.fetchById);
router.patch('/:id', users.updateById);
router.delete('/:id', users.deleteById);
router.post('/edit-profile', users.editProfile);

export default router;

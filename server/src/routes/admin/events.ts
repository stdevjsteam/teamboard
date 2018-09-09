import * as Router from 'koa-router';
import { events } from 'controllers';

const router = new Router({ prefix: '/events' });

router.get('/', events.fetchAll__ADMIN);
router.post('/', events.create);
router.get('/:id', events.fetchById__ADMIN);
router.patch('/:id', events.updateById);
router.delete('/:id', events.deleteById);
router.post('/:id/add-groups', events.addGroups);
router.post('/:id/delete-groups', events.deleteGroups);

export default router;

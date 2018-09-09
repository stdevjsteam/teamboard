import * as Router from 'koa-router';
import { interestingToKnows } from 'controllers';

const router = new Router({ prefix: '/interesting-to-knows' });

router.get('/', interestingToKnows.fetchAll__ADMIN);
router.post('/', interestingToKnows.create);
router.get('/:id', interestingToKnows.fetchById__ADMIN);
router.patch('/:id', interestingToKnows.updateById);
router.delete('/:id', interestingToKnows.deleteById);
router.post('/:id/add-groups', interestingToKnows.addGroups);
router.post('/:id/delete-groups', interestingToKnows.deleteGroups);

export default router;

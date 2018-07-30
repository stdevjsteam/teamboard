import * as Router from 'koa-router';
import { omit } from 'lodash';

const router = new Router({ prefix: '/users' });

router.get('/', async ctx => {
  const { User } = ctx.models;

  ctx.body = await User.findAll();
});

router.get('/:id', async ctx => {
  const { User } = ctx.models;
  const { id } = ctx.params;

  const user = await User.findById(id);
  ctx.assert(user, 404);
  ctx.body = user;
});

router.post('/edit-profile', async ctx => {
  const { User } = ctx.models;
  const data = omit(ctx.request.body, ['photo']);
  const { user } = ctx.state;

  await user.update(data);
  ctx.body = await User.findById(user.id);
});

export default router;

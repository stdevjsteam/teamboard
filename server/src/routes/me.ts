import * as Router from 'koa-router';

const router = new Router({ prefix: '/me' });

router.get('/', async ctx => {
  ctx.body = ctx.state.user.get({ plain: true });
});

export default router;

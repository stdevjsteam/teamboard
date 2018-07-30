import * as Router from 'koa-router';
import { News } from '../types/models';

const router = new Router({ prefix: '/news' });

router.get('/', async ctx => {
  const { News } = ctx.models;

  ctx.body = await News.findAll();
});

router.post('/', async ctx => {
  const { News } = ctx.models;
  const { body } = ctx.request;

  const result = await News.create(body as News);

  ctx.body = result.get({ plain: true });
});

router.get('/:id', async ctx => {
  const { News } = ctx.models;
  const { id } = ctx.params;

  const news = await News.findById(id);
  ctx.assert(news, 404);
  ctx.body = news;
});

router.patch('/:id', async ctx => {
  const { News } = ctx.models;
  const { id } = ctx.params;

  const result = await News.update(ctx.request.body, {
    where: { id },
    returning: true
  });

  ctx.body = result[1][0];
});

router.delete('/:id', async ctx => {
  const { News } = ctx.models;
  const { id } = ctx.params;

  const response = await News.destroy({ where: { id } });

  if (!response) {
    ctx.status = 404;
    return;
  }

  ctx.status = 200;
  ctx.body = { deletedIds: [id] };
});

export default router;

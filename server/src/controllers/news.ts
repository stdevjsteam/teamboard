import { IRouterContext } from 'koa-router';
import { News as _News } from '../types/models';

class News {
  fetchAll = async (ctx: IRouterContext) => {
    const { News } = ctx.models;

    ctx.body = await News.findAll();
  };

  create = async (ctx: IRouterContext) => {
    const { News } = ctx.models;
    const { body } = ctx.request;

    const result = await News.create(body as _News);

    ctx.body = result.get({ plain: true });
  };

  fetchById = async (ctx: IRouterContext) => {
    const { News } = ctx.models;
    const { id } = ctx.params;

    const news = await News.findById(id);
    ctx.assert(news, 404);
    ctx.body = news;
  };

  updateById = async (ctx: IRouterContext) => {
    const { News } = ctx.models;
    const { id } = ctx.params;

    const result = await News.update(ctx.request.body, {
      where: { id },
      returning: true
    });

    ctx.body = result[1][0];
  };

  deleteById = async (ctx: IRouterContext) => {
    const { News } = ctx.models;
    const { id } = ctx.params;

    const response = await News.destroy({ where: { id } });

    if (!response) {
      ctx.status = 404;
      return;
    }

    ctx.status = 200;
    ctx.body = { deletedIds: [id] };
  };
}

export default new News();

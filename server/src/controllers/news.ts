import { IRouterContext } from 'koa-router';
import models from '../models';
import Crud from './crud';

class News extends Crud {
  constructor() {
    super(models.News);
  }

  fetchAll__ADMIN = (ctx: IRouterContext) => {
    return this._findAll(ctx);
  };

  fetchAll__USER = (ctx: IRouterContext) => {
    const { Sequelize } = ctx.models;
    const { user } = ctx.state;

    return this._findAll(ctx, Sequelize.literal(
      `EXISTS(SELECT * from news_groups AS ng
        INNER JOIN group_members as gm
        ON gm.group_id = ng.group_id
        and ng.news_id = news.id
        AND gm.member_id = ${user.get('id')})`
    ) as any);
  };

  fetchById__ADMIN = (ctx: IRouterContext) => {
    return this._findById(ctx);
  };

  fetchById__USER = (ctx: IRouterContext) => {
    const { Sequelize } = ctx.models;
    const { user } = ctx.state;
    const { id } = ctx.params;

    return this._findById(ctx, Sequelize.literal(
      `news.id = ${id} AND EXISTS(SELECT * from news_groups AS ng
        INNER JOIN group_members as gm
        ON gm.group_id = ng.group_id
        and ng.news_id = news.id
        AND gm.member_id = ${user.get('id')})`
    ) as any);
  };

  create = (ctx: IRouterContext) => {
    return this._create(ctx, ['image']);
  };

  updateById = (ctx: IRouterContext) => {
    return this._updateById(ctx);
  };

  deleteById = (ctx: IRouterContext) => {
    return this._deleteById(ctx);
  };

  addGroups = async (ctx: IRouterContext) => {
    const { NewsGroup } = ctx.models;
    const { id } = ctx.params;
    const { groupIds = [] } = ctx.request.body;

    const newsGroups = groupIds.map((groupId: number) => ({
      groupId,
      newsId: id
    }));

    await NewsGroup.bulkCreate(newsGroups);

    ctx.body = '';
  };

  deleteGroups = async (ctx: IRouterContext) => {
    const { NewsGroup, Sequelize } = ctx.models;
    const { id } = ctx.params;
    const { groupIds = [] } = ctx.request.body;

    await NewsGroup.destroy({
      where: {
        newsId: id,
        groupId: {
          [Sequelize.Op.or]: groupIds
        }
      }
    });

    ctx.body = '';
  };
}

export default new News();

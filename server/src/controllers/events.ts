import { IRouterContext } from 'koa-router';
import models from '../models';
import Crud from './crud';

class Events extends Crud {
  constructor() {
    super(models.Event);
  }

  fetchAll__ADMIN = (ctx: IRouterContext) => {
    return this._findAll(ctx);
  };

  fetchAll__USER = (ctx: IRouterContext) => {
    const { Sequelize } = ctx.models;
    const { user } = ctx.state;

    return this._findAll(ctx, Sequelize.literal(
      `EXISTS(SELECT * from event_groups AS eg
        INNER JOIN group_members as gm
        ON gm.group_id = eg.group_id
        AND eg.event_id = event.id
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
      `event.id = ${id} AND EXISTS(SELECT * from event_groups AS eg
        INNER JOIN group_members as gm
        ON gm.group_id = eg.group_id
        and eg.event_id = event.id
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
    const { EventGroup } = ctx.models;
    const { id } = ctx.params;
    const { groupIds = [] } = ctx.request.body;

    const data = groupIds.map((groupId: number) => ({
      groupId,
      eventId: id
    }));

    await EventGroup.bulkCreate(data);

    ctx.body = '';
  };

  deleteGroups = async (ctx: IRouterContext) => {
    const { EventGroup, Sequelize } = ctx.models;
    const { id } = ctx.params;
    const { groupIds = [] } = ctx.request.body;

    await EventGroup.destroy({
      where: {
        eventId: id,
        groupId: {
          [Sequelize.Op.or]: groupIds
        }
      }
    });

    ctx.body = '';
  };
}

export default new Events();

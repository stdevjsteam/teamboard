import { IRouterContext } from 'koa-router';
import models from '../models';
import Crud from './crud';

class InterestingToKnows extends Crud {
  constructor() {
    super(models.InterestingToKnow);
  }

  fetchAll__ADMIN = (ctx: IRouterContext) => {
    return this._findAll(ctx);
  };

  fetchAll__USER = (ctx: IRouterContext) => {
    const { Sequelize } = ctx.models;
    const { user } = ctx.state;

    return this._findAll(ctx, Sequelize.literal(
      `EXISTS(SELECT * from interesting_to_know_groups AS itkg
        INNER JOIN group_members as gm
        ON gm.group_id = itkg.group_id
        AND itkg.interesting_to_know_id = interesting_to_know.id
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
      `interesting_to_know.id = ${id} AND EXISTS(SELECT * from interesting_to_know_groups AS itkg
        INNER JOIN group_members as gm
        ON gm.group_id = itkg.group_id
        and itkg.interesting_to_know_id = interesting_to_know.id
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
    const { InterestingToKnowGroup } = ctx.models;
    const { id } = ctx.params;
    const { groupIds = [] } = ctx.request.body;

    const interestingToKnowGroup = groupIds.map((groupId: number) => ({
      groupId,
      interestingToKnowId: id
    }));

    await InterestingToKnowGroup.bulkCreate(interestingToKnowGroup);

    ctx.body = '';
  };

  deleteGroups = async (ctx: IRouterContext) => {
    const { InterestingToKnowGroup, Sequelize } = ctx.models;
    const { id } = ctx.params;
    const { groupIds = [] } = ctx.request.body;

    await InterestingToKnowGroup.destroy({
      where: {
        interestingToKnowId: id,
        groupId: {
          [Sequelize.Op.or]: groupIds
        }
      }
    });

    ctx.body = '';
  };
}

export default new InterestingToKnows();

import { IRouterContext } from 'koa-router';
import { GroupRoles } from 'types';
import Crud from './crud';
import models from '../models';

interface Member {
  id: number;
  role: GroupRoles;
}

class Groups extends Crud {
  constructor() {
    super(models.Group);
  }

  fetchAll = (ctx: IRouterContext) => {
    return this._findAll(ctx);
  };

  fetchById = async (ctx: IRouterContext) => {
    return this._findById(ctx);
  };

  create = async (ctx: IRouterContext) => {
    return this._create(ctx);
  };

  updateById = async (ctx: IRouterContext) => {
    return this._updateById(ctx);
  };

  deleteById = async (ctx: IRouterContext) => {
    return this._deleteById(ctx);
  };

  addMembers = async (ctx: IRouterContext) => {
    const { GroupMembers } = ctx.models;
    const { id } = ctx.params;
    const members: Member[] = ctx.request.body.members || [];

    const groupMembers = members.map(member => {
      return {
        groupId: id,
        memberId: member.id,
        role: member.role
      };
    });

    await GroupMembers.bulkCreate(groupMembers);

    ctx.body = '';
  };

  deleteMembers = async (ctx: IRouterContext) => {
    const { GroupMembers, Sequelize } = ctx.models;
    const { id } = ctx.params;
    const { memberIds = [] } = ctx.request.body;

    await GroupMembers.destroy({
      where: {
        groupId: id,
        memberId: {
          [Sequelize.Op.or]: memberIds
        }
      }
    });

    ctx.body = '';
  };
}

export default new Groups();

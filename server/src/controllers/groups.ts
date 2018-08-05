import { IRouterContext } from 'koa-router';
import { GroupRoles } from 'types';
import { Group as _Group } from 'types/models';

class Groups {
  fetchAll = async (ctx: IRouterContext) => {
    const { Group, User } = ctx.models;

    const a = await Group.findAll({
      include: [
        {
          model: User,
          as: 'Members',
          through: { attributes: [] }
        }
      ]
    });

    ctx.body = JSON.parse(JSON.stringify(a));
  };

  fetchById = async (ctx: IRouterContext) => {
    const { Group } = ctx.models;
    const { id } = ctx.params;

    const group = await Group.findById(id);
    ctx.assert(group, 404);
    ctx.body = group;
  };

  create = async (ctx: IRouterContext) => {
    const { Group } = ctx.models;
    const { body } = ctx.request;

    const result = await Group.create(body as _Group);

    ctx.body = result.get({ plain: true });
  };

  updateById = async (ctx: IRouterContext) => {
    const { Group } = ctx.models;
    const { id } = ctx.params;
    const { body } = ctx.request;

    const result = await Group.update(body, {
      where: { groupId: id },
      returning: true
    });

    ctx.body = result[1][0];
  };

  deleteById = async (ctx: IRouterContext) => {
    const { Group } = ctx.models;
    const { id } = ctx.params;

    const response = await Group.destroy({ where: { id } });

    if (!response) {
      ctx.status = 404;
      return;
    }

    ctx.status = 200;
    ctx.body = { deletedIds: [id] };
  };

  addMembers = async (ctx: IRouterContext) => {
    const { GroupMembers } = ctx.models;
    const { id } = ctx.params;
    const { members = [] } = ctx.request.body;

    const groupMembers = members.map(
      (member: { id: number; role: GroupRoles }) => {
        return {
          groupId: id,
          memberId: member.id,
          role: member.role
        };
      }
    );

    await GroupMembers.bulkCreate(groupMembers);

    ctx.body = '';
  };

  deleteMembers = async (ctx: IRouterContext) => {
    const { GroupMembers, Sequelize } = ctx.models;
    const { id } = ctx.params;
    const { memberIds = [] } = ctx.request.body;

    await GroupMembers.destroy({
      where: {
        memberId: {
          groupId: id,
          [Sequelize.Op.or]: memberIds
        }
      }
    });

    ctx.body = '';
  };
}

export default new Groups();

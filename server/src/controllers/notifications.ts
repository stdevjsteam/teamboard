import { IRouterContext } from 'koa-router';
import models from '../models';
import Crud from './crud';

class Notifications extends Crud {
  constructor() {
    super(models.Notification);
  }

  create = (ctx: IRouterContext) => {
    const { notification, groupIds } = ctx.request.body;
    const { sequelize, Notification, NotificationGroup } = ctx.models;

    return sequelize.transaction(async transaction => {
      const notificationInstance = await Notification.create(notification, {
        transaction
      });

      const data = groupIds.map((groupId: number) => ({
        groupId,
        notificationId: notificationInstance.get('id')
      }));

      await NotificationGroup.bulkCreate(data, { transaction });
    });
  };

  //   fetchAll__USER = (ctx: IRouterContext) => {
  //     const { Sequelize } = ctx.models;
  //     const { user } = ctx.state;

  //     return this._findAll(ctx, Sequelize.literal(
  //       `EXISTS(SELECT * from event_groups AS eg
  //         INNER JOIN group_members as gm
  //         ON gm.group_id = eg.group_id
  //         AND eg.event_id = event.id
  //         AND gm.member_id = ${user.get('id')})`
  //     ) as any);
  //   };
}

export default new Notifications();

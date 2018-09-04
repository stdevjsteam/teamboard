import { IRouterContext } from 'koa-router';
import { omit } from 'lodash';

import Crud from './crud';
import models from '../models';
import { UserRoles } from '../types/index';

class Users extends Crud {
  constructor() {
    super(models.User);
  }

  fetchAll = (ctx: IRouterContext) => {
    return this._findAll(ctx, { where: { role: UserRoles.user } });
  };

  fetchById = (ctx: IRouterContext) => {
    return this._findById(ctx);
  };

  editProfile = async (ctx: IRouterContext) => {
    const { User } = ctx.models;
    const data = omit(ctx.request.body, ['image']);
    const { user } = ctx.state;

    await user.update(data);
    ctx.body = await User.findById(user.id);
  };
}

export default new Users();

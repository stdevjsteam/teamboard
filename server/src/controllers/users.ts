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
    return this._findAll(ctx, { role: UserRoles.user });
  };

  fetchById = (ctx: IRouterContext) => {
    return this._findById(ctx);
  };

  updateById = (ctx: IRouterContext) => {
    return this._updateById(ctx, { role: UserRoles.user });
  };

  deleteById = (ctx: IRouterContext) => {
    return this._deleteById(ctx, { role: UserRoles.user });
  };

  editProfile = async (ctx: IRouterContext) => {
    const { User } = ctx.models;
    const data = omit(ctx.request.body, ['image', 'role', 'active']);
    const { user } = ctx.state;

    await user.update(data);
    ctx.body = await User.findById(user.id);
  };
}

export default new Users();

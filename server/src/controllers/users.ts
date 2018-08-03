import { IRouterContext } from 'koa-router';

import { omit } from 'lodash';

class Users {
  fetchAll = async (ctx: IRouterContext) => {
    const { User } = ctx.models;

    ctx.body = await User.findAll();
  };

  fetchById = async (ctx: IRouterContext) => {
    const { User } = ctx.models;
    const { id } = ctx.params;

    const user = await User.findById(id);
    ctx.assert(user, 404);
    ctx.body = user;
  };

  editProfile = async (ctx: IRouterContext) => {
    const { User } = ctx.models;
    const data = omit(ctx.request.body, ['photo']);
    const { user } = ctx.state;

    await user.update(data);
    ctx.body = await User.findById(user.id);
  };
}

export default new Users();

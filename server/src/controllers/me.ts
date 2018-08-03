import { IRouterContext } from 'koa-router';

class Me {
  fetch = async (ctx: IRouterContext) => {
    const { User } = ctx.models;
    const id = ctx.state.user.get('id');

    ctx.body = await User.findById(id);
  };
}

export default new Me();

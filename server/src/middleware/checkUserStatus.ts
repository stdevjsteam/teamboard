import { Context, Next } from 'koa';
import * as unless from 'koa-unless';

const checkUserStatus = () => {
  const middleware: any = async (ctx: Context, next: Next) => {
    const { user } = ctx.state;

    if (!user.active) {
      ctx.throw(400, 'Your account has been set to inactive mode');
    }

    await next();
  };

  middleware.unless = unless;

  return middleware;
};

export default checkUserStatus;

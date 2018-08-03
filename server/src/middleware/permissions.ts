import { Context, Next } from 'koa';
import * as unless from 'koa-unless';

const permission = (role: string) => () => {
  const middleware: any = async (ctx: Context, next: Next) => {
    const userRole = ctx.state.user.get('role');

    if (userRole !== role) {
      ctx.throw(400, 'You have no permission to perform this action');
    }

    await next();
  };

  middleware.unless = unless;

  return middleware;
};

export const isAdmin = permission('admin');
export const isUser = permission('user');

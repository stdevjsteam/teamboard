import * as unless from 'koa-unless';
import { auth } from '../services';

import { Context, Next } from 'koa';

const authorization = () => {
  const middleware: any = async (ctx: Context, next: Next) => {
    try {
      const accessToken = ctx.headers.authorization;
      const { User } = ctx.models;

      const payload = await auth.verifyAccessToken(accessToken);

      ctx.state.user = await User.unscoped().findById(payload.user.id, {
        raw: false
      });
    } catch (e) {
      ctx.throw(401, e.message);
    }

    await next();
  };

  middleware.unless = unless;

  return middleware;
};

export default authorization;

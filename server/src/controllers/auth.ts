import * as bcrypt from 'bcryptjs';
import { IRouterContext } from 'koa-router';

import { auth } from '../services';

class Auth {
  signIn = async (ctx: IRouterContext) => {
    try {
      const { User } = ctx.models;
      const { body } = ctx.request;

      const user = await User.unscoped().findOne({
        where: { email: body.email },
        raw: false
      });

      if (!user) {
        throw new Error();
      }

      const valid = await bcrypt.compare(body.password, user.get('password'));

      if (!valid) {
        throw new Error();
      }

      ctx.body = {
        accessToken: auth.generateAccessToken(user.get({ plain: true })),
        refreshToken: auth.generateRefreshToken(user.get({ plain: true }))
      };
    } catch (e) {
      ctx.throw(400, 'No user found with provided email and password');
    }
  };

  refreshToken = async (ctx: IRouterContext) => {
    try {
      const { refreshToken } = ctx.request.body;

      ctx.body = { accessToken: await auth.refreshAccessToken(refreshToken) };
    } catch (e) {
      ctx.throw(400, e.message);
    }
  };
}

export default new Auth();

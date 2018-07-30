import * as Router from 'koa-router';
import * as bcrypt from 'bcryptjs';
import { auth } from '../services';

const router = new Router({ prefix: '/auth' });

router.post('/sign-in', async ctx => {
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
});

router.post('/refresh-token', async ctx => {
  try {
    const { refreshToken } = ctx.request.body;

    ctx.body = { accessToken: await auth.refreshAccessToken(refreshToken) };
  } catch (e) {
    ctx.throw(400, e.message);
  }
});

export default router;

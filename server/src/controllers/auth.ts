import * as bcrypt from 'bcryptjs';
import { IRouterContext } from 'koa-router';

import { auth } from '../services';
import generateRandomNumber from '../helpers/generateRandomNumber';
import { TokenPurposes } from '../types';
import mailer from '../services/mailer';

class Auth {
  signIn = async (ctx: IRouterContext) => {
    try {
      const { User } = ctx.models;
      const { body } = ctx.request;

      const user = await User.unscoped().findOne({
        where: { email: body.email }
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

  forgotPassword = async (ctx: IRouterContext) => {
    const { email } = ctx.request.body;
    const { Token, User } = ctx.models;
    const code = generateRandomNumber(100000, 999999);

    const resetPassword = await Token.findOne({
      where: { email, purpose: TokenPurposes.resetPassword }
    });

    ctx.assert(
      !resetPassword,
      400,
      'Reset password token to this email has already been sent'
    );

    const user = await User.findOne({ where: { email } });

    ctx.assert(user, 400, 'User does not exists');

    await Token.create({ email, code, purpose: TokenPurposes.resetPassword });

    await mailer({
      to: email,
      subject: 'Invitation to TeamBoard',
      html: `<div>Code for resetting the password: <strong>${code}</strong></div>`
    });

    ctx.body = {
      message: 'Reset password token has successfully been sent!'
    };
  };

  resetPassword = async (ctx: IRouterContext) => {
    const { code, password } = ctx.request.body;
    const { User, Token } = ctx.models;

    const resetPassword = await Token.findOne({
      where: { code, purpose: TokenPurposes.resetPassword }
    });

    ctx.assert(resetPassword, 400, 'Code is wrong');

    await User.update(
      {
        password
      },
      { where: { email: resetPassword!.get('email') } }
    );

    await resetPassword!.destroy();

    ctx.body = { message: 'Your password has successfully been changed!' };
  };
}

export default new Auth();

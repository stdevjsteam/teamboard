import { IRouterContext } from 'koa-router';
import generateRandomNumber from '../helpers/generateRandomNumber';
import { mailer } from '../services';
import { omit } from 'lodash';
import { TokenPurposes } from '../types';

class Invitations {
  sendCode = async (ctx: IRouterContext) => {
    const { email } = ctx.request.body;
    const { Token, User } = ctx.models;
    const code = generateRandomNumber(100000, 999999);

    const invitation = await Token.findOne({
      where: { email, purpose: TokenPurposes.inviteUser }
    });

    ctx.assert(
      !invitation,
      400,
      'Invitation to this email has already been sent'
    );

    const user = await User.findOne({ where: { email } });

    ctx.assert(!user, 400, 'Such user already exists');

    await Token.create({ email, code, purpose: TokenPurposes.inviteUser });

    await mailer({
      to: email,
      subject: 'Invitation to TeamBoard',
      html: `<div>Type this code in the app to join us: <strong>${code}</strong></div>`
    });

    ctx.body = { message: 'Invitation has successfully been sent!' };
  };

  checkCode = async (ctx: IRouterContext) => {
    const { code } = ctx.request.body;
    const { Token } = ctx.models;

    const invitation = await Token.findOne({
      where: { code, purpose: TokenPurposes.inviteUser }
    });

    ctx.assert(invitation, 400, 'Code is wrong');

    ctx.body = { message: 'OK' };
  };

  confirm = async (ctx: IRouterContext) => {
    const { code, user = {} } = ctx.request.body;
    const userDetails = omit(user, ['id', 'email']);
    const { User, Token } = ctx.models;

    const invitation = await Token.findOne({
      where: { code, purpose: TokenPurposes.inviteUser },
      raw: false
    });

    ctx.assert(invitation, 400, 'Code is wrong');

    await User.create({
      ...userDetails,
      email: invitation!.get('email'),
      role: 'user'
    });

    await invitation!.destroy();

    ctx.body = { message: 'You have successfully been registered!' };
  };
}

export default new Invitations();

import * as Router from 'koa-router';
import generateRandomNumber from '../helpers/generateRandomNumber';
import { mailer } from '../services';
import { omit } from 'lodash';

const router = new Router({ prefix: '/invitations' });

router.post('/send-code', async ctx => {
  const { email } = ctx.request.body;
  const { Invitation, User } = ctx.models;
  const code = generateRandomNumber(100000, 999999);

  const invitation = await Invitation.findOne({ where: { email } });

  ctx.assert(
    !invitation,
    400,
    'Invitation to this email has already been sent'
  );

  const user = await User.findOne({ where: { email } });

  ctx.assert(!user, 400, 'Such user already exists');

  await Invitation.create({ email, code });

  await mailer({
    to: email,
    subject: 'Invitation to TeamBoard',
    html: `<div>Type this code in the app to join us: <strong>${code}</strong></div>`
  });

  ctx.body = { message: 'Invitation has successfully been sent!' };
});

router.post('/check-code', async ctx => {
  const { code } = ctx.request.body;
  const { Invitation } = ctx.models;

  const invitation = await Invitation.findOne({ where: { code } });

  ctx.assert(invitation, 400, 'Code is wrong');

  ctx.body = { message: 'OK' };
});

router.post('/confirm', async ctx => {
  const { code, user = {} } = ctx.request.body;
  const userDetails = omit(user, ['id', 'email']);
  const { User, Invitation } = ctx.models;

  const invitation = await Invitation.findOne({ where: { code }, raw: false });

  ctx.assert(invitation, 400, 'Code is wrong');

  await User.create({ ...userDetails, email: invitation!.get('email') });
  await invitation!.destroy();

  ctx.body = { message: 'You have successfully been registered!' };
});

export default router;

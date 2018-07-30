import * as Router from 'koa-router';
import { upload } from '../services';

const router = new Router({ prefix: '/files' });

router.post('/', async ctx => {
  try {
    const { file, purpose } = ctx.request.body;

    switch (purpose) {
      case 'user_photo':
        const { User } = ctx.models;
        const { user } = ctx.state;
        const id = user.get('id');

        const path = await upload({
          oldPath: user.get('photo'),
          newPath: `static/photos/${id}-${Date.now()}`,
          file
        });

        const response = await User.update(
          { photo: path },
          { where: { id }, returning: true }
        );

        ctx.body = response[1][0];
        break;
      default:
        ctx.status = 400;
        ctx.body = '';
    }
  } catch (e) {
    ctx.throw(400, 'invalid base64');
  }
});

export default router;

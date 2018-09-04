import { camelizeKeys, decamelizeKeys } from 'humps';
import { omit } from 'lodash';
import { Context, Next } from 'koa';
import { Model } from 'sequelize';

const transformer = () => async (ctx: Context, next: Next) => {
  // exclude id's so that we can be sure id is inserted by the ORM
  const bodyWithoutId = omit(ctx.request.body, ['id']);

  ctx.request.body = camelizeKeys(bodyWithoutId);
  ctx.request.query = camelizeKeys(ctx.request.query);

  await next();

  if (ctx.body) {
    if (Array.isArray(ctx.body)) {
      ctx.body = ctx.body.map(item => {
        if (item instanceof (Model as any)) {
          return item.get({ plain: true });
        }

        return item;
      });
    } else if (ctx.body instanceof (Model as any)) {
      return ctx.body.get({ plain: true });
    }

    ctx.body = decamelizeKeys(ctx.body);
  }
};

export default transformer;

import { camelizeKeys, decamelizeKeys } from 'humps';
import { omit } from 'lodash';
import { Context, Next } from 'koa';

const transformer = () => async (ctx: Context, next: Next) => {
  // exclude id's so that we can be sure id is inserted by the ORM
  const bodyWithoutId = omit(ctx.request.body, ['id']);

  ctx.request.body = camelizeKeys(bodyWithoutId);
  ctx.request.query = camelizeKeys(ctx.request.query);

  await next();

  if (ctx.body) {
    ctx.body = decamelizeKeys(ctx.body);
  }
};

export default transformer;

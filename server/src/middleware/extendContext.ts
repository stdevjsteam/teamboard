import models from '../models';
import { Context, Next } from 'koa';

const setRepos = () => async (ctx: Context, next: Next) => {
  ctx.models = models;

  await next();
};

export default setRepos;

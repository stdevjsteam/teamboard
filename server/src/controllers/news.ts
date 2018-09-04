import { IRouterContext } from 'koa-router';
import models from '../models';
import Crud from './crud';

class News extends Crud {
  constructor() {
    super(models.News);
  }

  fetchAll = (ctx: IRouterContext) => {
    return this._findAll(ctx);
  };

  create = (ctx: IRouterContext) => {
    return this._create(ctx, ['image']);
  };

  fetchById = (ctx: IRouterContext) => {
    return this._findById(ctx);
  };

  updateById = (ctx: IRouterContext) => {
    return this._updateById(ctx);
  };

  deleteById = (ctx: IRouterContext) => {
    return this._deleteById(ctx);
  };
}

export default new News();

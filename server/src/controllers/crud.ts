import models from '../models';
import { IRouterContext } from 'koa-router';
import { omit } from 'lodash';
import { WhereOptions } from 'sequelize';

type Model =
  | typeof models.News
  | typeof models.User
  | typeof models.Token
  | typeof models.Group
  | typeof models.GroupMember
  | any;

const include = (ctx: IRouterContext) => {
  let associations = [];

  if (ctx.query.associations) {
    associations = ctx.query.associations.split(',');
  }

  return {
    include: associations.map((association: string) => ({
      association
    }))
  };
};

const paginate = (ctx: IRouterContext) => {
  const { page = 1, limit = null } = ctx.query;

  return {
    limit,
    offset: (page - 1) * limit
  };
};

class Crud {
  model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  public async _findAll(ctx: IRouterContext, where: WhereOptions<any> = {}) {
    ctx.body = await this.model.findAndCountAll({
      where,
      ...include(ctx),
      ...paginate(ctx)
    });
  }

  public async _findById(
    ctx: IRouterContext,
    where: WhereOptions<any> = { id: ctx.params.id }
  ) {
    const news = await this.model.findOne({
      where,
      ...include(ctx)
    });

    ctx.assert(news, 404);

    ctx.body = news;
  }

  public async _create(ctx: IRouterContext, omitProps: string[] = []) {
    const data = omit(ctx.request.body, omitProps);

    const result = await this.model.create(data);

    ctx.body = result.get({ plain: true });
    ctx.status = 201;
  }

  public async _updateById(ctx: IRouterContext, where: WhereOptions<any> = {}) {
    const { id } = ctx.params;

    const result = await this.model.update(ctx.request.body, {
      where: { id, ...where },
      returning: true
    });

    const updatedData = result[1][0];

    ctx.assert(updatedData, 404);

    ctx.body = updatedData;
  }

  public async _deleteById(ctx: IRouterContext, where: WhereOptions<any> = {}) {
    const { id } = ctx.params;

    const response = await this.model.destroy({ where: { id, ...where } });

    if (!response) {
      ctx.status = 404;
      return;
    }

    ctx.status = 204;
  }
}

export default Crud;

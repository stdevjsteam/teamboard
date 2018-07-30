import { Context, Next } from 'koa';
import { ValidationErrorItem, ValidationError } from 'sequelize';

const errorHandler = () => async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
    let status = err.status || 500;
    let body = err;

    if (err.name === 'SequelizeValidationError') {
      body = {
        validationErrors: (err as ValidationError).errors.map(
          (e: ValidationErrorItem) => ({
            target: e.path,
            message: e.message
          })
        )
      };

      status = 400;
    }
    ctx.status = status;
    ctx.body = body;
  }
};

export default errorHandler;

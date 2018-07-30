import * as Koa from 'koa';
import models from './models';

const port = 8000;
const force = false;

export const start = async (app: Koa) => {
  try {
    if (process.env.NODE_ENV !== 'test') {
      await models.sequelize.sync({ force });

      app.listen(port, () => {
        // tslint:disable
        console.log(`server is listening to port ${port}`);
      });
    }
  } catch (e) {
    console.log(e);
  }
};

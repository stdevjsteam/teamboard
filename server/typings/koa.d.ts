import models from '../src/models';

declare module 'koa' {
  export type Next = () => Promise<void>;

  interface Context {
    models: typeof models;
  }

  interface Request {
    body: { [key: string]: any };
    rawBody: { [key: string]: any };
  }
}

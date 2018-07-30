import 'reflect-metadata';
import 'dotenv/config';
import 'regenerator-runtime/runtime';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as cors from '@koa/cors';
import * as serve from 'koa-static';
import * as mount from 'koa-mount';

import {
  errorHandler,
  transformer,
  extendContext,
  authorization
} from './middleware';
import { auth, users, news, files, me, invitations } from './routes';
import { start } from './start';

const app = new Koa();

// third-party middleware
app.use(bodyParser());
app.use(cors());
app.use(mount('/static', serve('static')));

// custom middleware
app.use(transformer());
app.use(errorHandler());
app.use(extendContext());
app.use(authorization().unless({ path: /^\/auth/ }));

// routes
app.use(auth.routes());
app.use(users.routes());
app.use(news.routes());
app.use(files.routes());
app.use(me.routes());
app.use(invitations.routes());

export const callback = app.callback();

start(app);

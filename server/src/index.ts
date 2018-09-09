import 'reflect-metadata';
import 'dotenv/config';
import 'regenerator-runtime/runtime';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as cors from '@koa/cors';
import * as serve from 'koa-static';
import * as mount from 'koa-mount';
import * as Subdomain from 'koa-subdomain';
import * as Router from 'koa-router';

import {
  errorHandler,
  transformer,
  extendContext,
  authorization,
  isAdmin,
  isUser,
  checkUserStatus
} from './middleware';
import * as admin from './routes/admin';
import * as user from './routes/user';
import { start } from './start';

const app = new Koa();

app.subdomainOffset = 1;

// third-party middleware
app.use(bodyParser());
app.use(cors());
app.use(mount('/static', serve('static')));

// custom middleware
app.use(transformer());
app.use(errorHandler());
app.use(extendContext());
app.use(authorization().unless({ path: /^\/auth/ }));
app.use(checkUserStatus().unless({ path: /^\/auth/ }));

// admin routes
const subdomain = new Subdomain();
const adminRouter = new Router();

adminRouter.use(
  isAdmin().unless({ path: /^\/auth/ }),
  admin.auth.routes(),
  admin.files.routes(),
  admin.invitations.routes(),
  admin.me.routes(),
  admin.news.routes(),
  admin.users.routes(),
  admin.groups.routes(),
  admin.interestingToKnows.routes(),
  admin.events.routes()
);

subdomain.use('admin', adminRouter.routes());

const userRouter = new Router();

userRouter.use(
  isUser().unless({ path: /^\/auth/ }),
  user.auth.routes(),
  user.files.routes(),
  user.invitations.routes(),
  user.me.routes(),
  user.news.routes(),
  user.users.routes(),
  user.interestingToKnows.routes(),
  user.events.routes()
);

app.use(subdomain.routes());
app.use(userRouter.routes());

export const callback = app.callback();

start(app);

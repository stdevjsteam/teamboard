import { agent } from 'supertest';
import { SuperAgentRequest } from 'superagent';

import { callback } from '../src';
import { admin, user } from './mock';
import models from '../src/models';
import { auth } from '../src/services';

const defaults = require('superagent-defaults');

export default async () => {
  const { sequelize, User } = models;

  await sequelize.sync({ force: true });

  const userApi = defaults(agent(callback));
  const adminApi = defaults(agent(callback));

  await User.bulkCreate([admin, user]);

  const adminTokens = {
    accessToken: auth.generateAccessToken(admin),
    refreshToken: auth.generateRefreshToken(admin)
  };

  const userTokens = {
    accessToken: auth.generateAccessToken(user),
    refreshToken: auth.generateRefreshToken(user)
  };

  adminApi.use((req: SuperAgentRequest) => {
    req.set('Authorization', adminTokens.accessToken);
    req.url = req.url.replace(/^http:\/\//, 'http://admin.');
    console.log(req.url);
    return req;
  });

  userApi.use((req: SuperAgentRequest) => {
    req.set('Authorization', userTokens.accessToken);
    return req;
  });

  global.admin = { details: admin, tokens: adminTokens, api: adminApi };
  global.user = { details: user, tokens: userTokens, api: userApi };
};

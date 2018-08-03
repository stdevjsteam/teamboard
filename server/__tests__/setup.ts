import { agent } from 'supertest';
import { SuperAgentRequest } from 'superagent';

import { callback } from '../src';
import { admin, user } from './mock';
import models from '../src/models';

const defaults = require('superagent-defaults');

export default async () => {
  await models.sequelize.sync({ force: true });

  const userApi = defaults(agent(callback));
  const adminApi = defaults(agent(callback));

  const t= await userApi.post('/auth/sign-up').send(admin);
  await userApi.post('/auth/sign-up').send(user);
console.log(t.body)
  const adminTokens = await userApi.post('/auth/sign-in').send(admin);
  const userTokens = await userApi.post('/auth/sign-in').send(user);

  adminApi.use((req: SuperAgentRequest) => {
    req.set('Authorization', adminTokens.body.access_token);
    // set('Host', 'subdomain.example.com')
    console.log(adminTokens.body);
    return req;
  });

  userApi.use((req: SuperAgentRequest) => {
    req.set('Authorization', userTokens.body.access_token);
    return req;
  });

  global.admin = { details: admin, tokens: adminTokens, api: adminApi };
  global.user = { details: user, tokens: userTokens, api: userApi };
};

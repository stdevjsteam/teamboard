import { agent } from 'supertest';
import { SuperAgentRequest } from 'superagent';
import { createConnection } from 'typeorm';

import { callback } from '../lib';
import { generateUser } from './mock';
import { getRepositories } from '../lib/helpers';

const defaults = require('superagent-defaults');
const ormconfig = require('../ormconfig.json');
const { NODE_ENV } = process.env;

export default async () => {
  await createConnection(ormconfig[NODE_ENV!]);

  const api = defaults(agent(callback));

  const u = generateUser();

  await api.post('/auth/sign-up').send(u);

  const tokens = await api.post('/auth/sign-in').send(u);

  api.use((req: SuperAgentRequest) => {
    req.set('Authorization', tokens.body.access_token);
    return req;
  });

  global.accessToken = tokens.body.access_token;
  global.refreshToken = tokens.body.refresh_token;
  global.me = u;
  global.api = api;
  global.repos = getRepositories();
};

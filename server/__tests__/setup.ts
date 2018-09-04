import './mock';
import { agent } from 'supertest';
import { SuperAgentRequest } from 'superagent';
import * as casual from 'casual';

import { callback } from '../src';
import models from '../src/models';
import { auth } from '../src/services';

import * as defaults from 'superagent-defaults';
import { UserRoles } from '../src/types/index';

const fn = async () => {
  try {
    const { User, sequelize } = models;

    await sequelize.sync({ force: true });

    const userApi = defaults(agent(callback));
    const adminApi = defaults(agent(callback));

    const user = casual.user({ role: UserRoles.user });
    const admin = casual.user({ role: UserRoles.admin });

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
      req.set('Host', 'admin.localhost');

      return req;
    });

    userApi.use((req: SuperAgentRequest) => {
      req.set('Authorization', userTokens.accessToken);
      return req;
    });

    global.admin = {
      details: admin,
      tokens: adminTokens,
      api: adminApi
    };

    global.user = {
      details: user,
      tokens: userTokens,
      api: userApi
    };
  } catch (e) {
    console.log(e);
  }
};

beforeAll(fn);

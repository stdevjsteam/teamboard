import { Group } from '../../src/types/models';
import { Instance } from 'sequelize';
import models from '../../src/models/index';
import * as casual from 'casual';

describe('groups controller', () => {
  let group: Instance<Group>;

  beforeEach(async () => {
    group = await models.Group.create(casual.group());
  });

  afterEach(() => {
    return models.Group.destroy({ where: {} });
  });

  describe('addMembers', () => {});
});

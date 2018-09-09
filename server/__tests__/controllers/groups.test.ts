import { Group } from '../../src/types/models';
import { Instance } from 'sequelize';
import models from '../../src/models/index';
import * as casual from 'casual';

describe('groups controller', () => {
  let group: Instance<Group>;

  beforeEach(async () => {
    group = await models.Group.create(casual.group());

    await admin.api
      .post(`/groups/${group.get('id')}/add-members`)
      .send({ members: [{ id: admin.details.id, role: 'member' }] });
  });

  afterEach(async () => {
    await models.Group.destroy({ where: {} });
    await models.GroupMember.destroy({ where: {} });
  });

  describe('addMembers', () => {
    test('should successfully add new members', async () => {
      const response = await admin.api
        .get(`/groups/${group.get('id')}`)
        .query({ associations: 'members' });

      const { members } = response.body;

      expect(members.length).toBe(1);
      expect(members[0].id).toBe(admin.details.id);
    });
  });

  describe('deleteMembers', () => {
    test('should successfully delete members', async () => {
      await admin.api
        .post(`/groups/${group.get('id')}/delete-members`)
        .send({ memberIds: [admin.details.id] });

      const response = await admin.api
        .get(`/groups/${group.get('id')}`)
        .query({ associations: 'members' });

      const { members } = response.body;

      expect(members.length).toBe(0);
    });
  });
});

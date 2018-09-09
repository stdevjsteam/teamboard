import { Instance } from 'sequelize';
import { Event, Group } from '../../src/types/models';
import * as casual from 'casual';
import models from '../../src/models';
import { Response } from 'supertest';

describe('events controller', () => {
  let event: Instance<Event>;
  let group: Instance<Group>;

  beforeEach(async () => {
    group = await models.Group.create(casual.group());

    await admin.api
      .post(`/groups/${group.get('id')}/add-members`)
      .send({ members: [{ id: user.details.id, role: 'member' }] });

    event = await models.Event.create(casual.event());

    await admin.api
      .post(`/events/${event.get('id')}/add-groups`)
      .send({ groupIds: [group.get('id')] });
  });

  afterEach(async () => {
    await models.Event.destroy({ where: {} });
    await models.Group.destroy({ where: {} });
  });

  test('addGroups', async () => {
    await user.api
      .get('/events')
      .expect(200)
      .then((response: Response) => {
        expect(response.body.count).toBe(1);
      });
  });

  test('deleteGroups', async () => {
    await admin.api
      .post(`/events/${event.get('id')}/delete-groups`)
      .send({ groupIds: [group.get('id')] });

    await user.api
      .get('/events')
      .expect(200)
      .then((response: Response) => {
        expect(response.body.count).toBe(0);
      });
  });

  describe('fetchById__USER', () => {
    test('should successfuly return event I have access to', () => {
      return user.api
        .get(`/events/${event.get('id')}`)
        .expect(200)
        .then((response: Response) => {
          expect(response.body.id).toBe(event.get('id'));
        });
    });

    test('should prevent from accessing event that I have not access to', async () => {
      const anotherEvent = await models.Event.create(casual.event());

      await user.api.get(`/events/${anotherEvent.get('id')}`).expect(404);
    });
  });
});

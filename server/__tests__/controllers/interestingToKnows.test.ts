import { Instance } from 'sequelize';
import { InterestingToKnow, Group } from '../../src/types/models';
import * as casual from 'casual';
import models from '../../src/models';
import { Response } from 'supertest';

describe('interestingToKnows controller', () => {
  let interestingToKnow: Instance<InterestingToKnow>;
  let group: Instance<Group>;

  beforeEach(async () => {
    group = await models.Group.create(casual.group());

    await admin.api
      .post(`/groups/${group.get('id')}/add-members`)
      .send({ members: [{ id: user.details.id, role: 'member' }] });

    interestingToKnow = await models.InterestingToKnow.create(
      casual.interestingToKnow()
    );

    await admin.api
      .post(`/interesting-to-knows/${interestingToKnow.get('id')}/add-groups`)
      .send({ groupIds: [group.get('id')] });
  });

  afterEach(async () => {
    await models.InterestingToKnow.destroy({ where: {} });
    await models.Group.destroy({ where: {} });
  });

  test('addGroups', async () => {
    await user.api
      .get('/interesting-to-knows')
      .expect(200)
      .then((response: Response) => {
        expect(response.body.count).toBe(1);
      });
  });

  test('deleteGroups', async () => {
    await admin.api
      .post(
        `/interesting-to-knows/${interestingToKnow.get('id')}/delete-groups`
      )
      .send({ groupIds: [group.get('id')] });

    await user.api
      .get('/interesting-to-knows')
      .expect(200)
      .then((response: Response) => {
        expect(response.body.count).toBe(0);
      });
  });

  describe('fetchById__USER', () => {
    test('should successfuly return interesting to know I have access to', () => {
      return user.api
        .get(`/interesting-to-knows/${interestingToKnow.get('id')}`)
        .expect(200)
        .then((response: Response) => {
          expect(response.body.id).toBe(interestingToKnow.get('id'));
        });
    });

    test('should prevent from accessing interesting to know that I have not access to', async () => {
      const anotherInterestingToKnow = await models.InterestingToKnow.create(
        casual.interestingToKnow()
      );

      await user.api
        .get(`/interesting-to-know/${anotherInterestingToKnow.get('id')}`)
        .expect(404);
    });
  });
});

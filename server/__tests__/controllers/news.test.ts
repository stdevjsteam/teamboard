import { Instance } from 'sequelize';
import { News, Group } from '../../src/types/models';
import * as casual from 'casual';
import models from '../../src/models';
import { Response } from 'supertest';

describe('news controller', () => {
  let news: Instance<News>;
  let group: Instance<Group>;

  beforeEach(async () => {
    group = await models.Group.create(casual.group());

    await admin.api
      .post(`/groups/${group.get('id')}/add-members`)
      .send({ members: [{ id: user.details.id, role: 'member' }] });

    news = await models.News.create(casual.news());

    await admin.api
      .post(`/news/${news.get('id')}/add-groups`)
      .send({ groupIds: [group.get('id')] });
  });

  afterEach(async () => {
    await models.News.destroy({ where: {} });
    await models.Group.destroy({ where: {} });
  });

  test('addGroups', async () => {
    await user.api
      .get('/news')
      .expect(200)
      .then((response: Response) => {
        expect(response.body.count).toBe(1);
      });
  });

  test('deleteGroups', async () => {
    await admin.api
      .post(`/news/${news.get('id')}/delete-groups`)
      .send({ groupIds: [group.get('id')] });

    await user.api
      .get('/news')
      .expect(200)
      .then((response: Response) => {
        expect(response.body.count).toBe(0);
      });
  });

  describe('fetchById__USER', () => {
    test('should successfuly return news I have access to', () => {
      return user.api
        .get(`/news/${news.get('id')}`)
        .expect(200)
        .then((response: Response) => {
          expect(response.body.id).toBe(news.get('id'));
        });
    });

    test('should prevent from accessing news that I have not access to', async () => {
      const anotherNews = await models.News.create(casual.news());

      await user.api.get(`/news/${anotherNews.get('id')}`).expect(404);
    });
  });
});

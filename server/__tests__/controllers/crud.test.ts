import * as casual from 'casual';
import { News } from '../../src/types/models';

describe('crud operations', () => {
  const news = casual.news();
  let createdNews: News;

  beforeEach(async () => {
    const response = await admin.api
      .post('/news')
      .send(news)
      .expect(201);

    createdNews = response.body;
  });

  describe('fetchAll', () => {
    test('should return list of items', () => {
      return admin.api.get('/news').expect(200);
    });
  });

  describe('create', () => {
    test('should create an item', () => {
      return admin.api
        .post('/news')
        .send(news)
        .expect(201);
    });
  });

  describe('fetchById', () => {
    test('should return 404 if item is not found', () => {
      return admin.api.get('/news/46516516').expect(404);
    });

    test('should return the item if found', async () => {
      return admin.api.get(`/news/${createdNews.id}`).expect(200);
    });
  });

  describe('updateById', () => {
    test('should return 404 if item does not exist', () => {
      return admin.api
        .patch(`/news/${23242}`)
        .send(news)
        .expect(404);
    });

    test('should update the item', () => {
      return admin.api
        .patch(`/news/${createdNews.id}`)
        .send(news)
        .expect(200);
    });
  });

  describe('deleteById', () => {
    test('should return 404 if item does not exist', () => {
      return admin.api.delete(`/news/${23242}`).expect(404);
    });

    test('should delete the item', () => {
      return admin.api.delete(`/news/${createdNews.id}`).expect(204);
    });
  });
});

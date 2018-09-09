import models from '../../src/models';

describe('checkUserStatus middleware', () => {
  test('should prevent inactive users from accessing resources', async () => {
    await models.User.update(
      { active: false },
      { where: { id: admin.details.id as number } }
    );

    await admin.api.get('/news').expect(400);

    await models.User.update(
      { active: true },
      { where: { id: admin.details.id as number } }
    );
  });

  test('should successfuly return the result', async () => {
    return admin.api.get('/news').expect(200);
  });
});

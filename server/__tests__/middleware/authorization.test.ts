const { api } = global;

describe('Authorization middleware', () => {
  it('should prevent accessing protected resources if access token is not provided', () =>
    api
      .get('/auth/me')
      .set('Authorization', null)
      .expect(401));

  it('response should be successful if access token is provided', () =>
    api.get('/auth/me').expect(200));
});

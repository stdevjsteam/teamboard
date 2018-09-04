describe('authorization middleware', () => {
  test('should prevent accessing protected resources if access token is not provided', () =>
    user.api
      .get('/me')
      .set('Authorization', '')
      .expect(401));

  test('response should be successful if access token is provided', () =>
    user.api.get('/me').expect(200));
});

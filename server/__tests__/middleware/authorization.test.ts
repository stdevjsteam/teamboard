describe('authorization middleware', () => {
  it('should prevent accessing protected resources if access token is not provided', () =>
    user.api
      .get('/me')
      .set('Authorization', null)
      .expect(401));

  it('response should be successful if access token is provided', () =>
    user.api.get('/me').expect(200));
});

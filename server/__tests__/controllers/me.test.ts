describe('me controller', () => {
  it.only('should return user details which makes a request', () => {
    return user.api.get('/me').expect(200);
  });
});

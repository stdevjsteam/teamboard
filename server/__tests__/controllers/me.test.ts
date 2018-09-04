describe('me controller', () => {
  describe('fetch', () => {
    test('should return user details which makes a request', () => {
      return user.api.get('/me').expect(200);
    });
  });
});

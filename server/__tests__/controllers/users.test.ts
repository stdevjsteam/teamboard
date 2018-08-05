describe('users controller', () => {
  describe('GET /users', () => {
    it('should return list of users', () => {
      return admin.api.get('/users').expect(200);
    });
  });

  describe('GET /users/:id', () => {
    it('should return 404 if id user is not found', () => {
      return admin.api.get('/users/46516516').expect(404);
    });

    it('should return the user if user is found', () => {
      return admin.api.get(`/users/${admin.details.id}`).expect(200);
    });
  });
});

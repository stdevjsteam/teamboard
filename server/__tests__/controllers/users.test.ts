describe('users controller', () => {
  describe('editProfile', () => {
    test('should update user details', () => {
      return admin.api.post('/users/edit-profile').expect(200);
    });
  });
});

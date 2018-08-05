describe('permissions middleware', () => {
  it('should prevent users from accessing protected routes', () => {
    return user.api
      .post('/invitations/send-code')
      .send({ email: 'teamboard_test@mailinator.com' })
      .set('Host', 'admin.localhost')
      .expect(400);
  });

  it('should not prevent accessing from user routes', () => {
    return user.api.get('/me').expect(200);
  });

  it('should prevent admins from accessing protected routes', () => {
    return admin.api
      .post('/invitations/check-code')
      .send({ email: 'teamboard_test@mailinator.com' })
      .set('Host', null)
      .expect(400);
  });

  it('should not prevent accessing from admin routes', () => {
    return admin.api.get('/me').expect(200);
  });
});

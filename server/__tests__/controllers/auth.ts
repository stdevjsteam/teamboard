import { Response } from 'supertest';

describe('auth controller', () => {
  describe('POST /auth/sign-in', () => {
    it('should return an error when email is wrong', () => {
      return user.api
        .post('/auth/sign-in')
        .send({ email: 'wrong_email@gmail.com' })
        .expect(400);
    });

    it('should return an error when password is wrong', () => {
      return user.api
        .post('/auth/sign-in')
        .send({ email: user.details.email, password: 'wrong_password' })
        .expect(400);
    });

    it('should give us tokens', () => {
      return user.api
        .post('/auth/sign-in')
        .send({
          email: user.details.email,
          password: user.details.plainPassword
        })
        .expect(200)
        .then((response: Response) => {
          expect(response.body.access_token).toBeDefined();
          expect(response.body.refresh_token).toBeDefined();
        });
    });
  });

  describe('POST /auth/refresh-token', () => {
    it('should return 400 in case the provided refresh token is wrong', () => {
      return user.api
        .post('/auth/refresh-token')
        .send({ refreshToken: 'wrong_token' })
        .expect(400);
    });

    it('should give us refreshed token', () => {
      return user.api
        .post('/auth/refresh-token')
        .send({ refreshToken: user.tokens.refreshToken })
        .expect(200)
        .then((response: Response) => {
          expect(response.body.access_token).toBeDefined();
        });
    });
  });

  describe('POST /auth/forgot-password', () => {
    it('should return an error when token has already been sent', () => {
      return admin.api
        .post('/auth/forgot-password')
        .send({ email: user.details.email })
        .expect(200);
    });
  });
});

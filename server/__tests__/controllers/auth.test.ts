import { Response } from 'supertest';
import models from '../../src/models';

describe('auth controller', () => {
  describe('signIn', () => {
    test('should return an error when email is wrong', () => {
      return user.api
        .post('/auth/sign-in')
        .send({ email: 'wrong_email@gmail.com' })
        .expect(400);
    });

    test('should return an error when password is wrong', () => {
      return user.api
        .post('/auth/sign-in')
        .send({ email: user.details.email, password: 'wrong_password' })
        .expect(400);
    });

    test('should give us tokens', () => {
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

  describe('refreshToken', () => {
    test('should return 400 in case the provided refresh token is wrong', () => {
      return user.api
        .post('/auth/refresh-token')
        .send({ refreshToken: 'wrong_token' })
        .expect(400);
    });

    test('should give us refreshed token', () => {
      return user.api
        .post('/auth/refresh-token')
        .send({ refreshToken: user.tokens.refreshToken })
        .expect(200)
        .then((response: Response) => {
          expect(response.body.access_token).toBeDefined();
        });
    });
  });

  describe('forgotPassword', () => {
    afterEach(() => {
      return models.Token.destroy({ where: {} });
    });

    test('should return an error if token has already been sent', async () => {
      await admin.api
        .post('/auth/forgot-password')
        .send({ email: user.details.email });

      await admin.api
        .post('/auth/forgot-password')
        .send({ email: user.details.email })
        .expect(400);
    });

    test('should return an error if such email is not registered', () => {
      return admin.api
        .post('/auth/forgot-password')
        .send({ email: 'wrong_email@gmail.com' })
        .expect(400);
    });

    test('should email us a token for resetting the password', () => {
      return admin.api
        .post('/auth/forgot-password')
        .send({ email: user.details.email })
        .expect(200);
    });
  });

  describe('resetPassword', () => {
    test('should return an error when code is wrong', () => {
      return user.api
        .post('/auth/reset-password')
        .send({ code: 123456 })
        .expect(400);
    });

    test('should reset the password', async () => {
      await admin.api
        .post('/auth/forgot-password')
        .send({ email: user.details.email });

      const resetPassword = await models.Token.findOne({
        where: { email: user.details.email }
      });

      await user.api
        .post('/auth/reset-password')
        .send({ code: resetPassword!.get('code'), password: 'new_password' })
        .expect(200);

      const resetPassword2 = await models.Token.findOne({
        where: { email: user.details.email }
      });

      expect(resetPassword2).toBeNull();
    });
  });
});

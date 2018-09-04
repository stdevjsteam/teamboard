import * as casual from 'casual';
import { Instance } from 'sequelize';
import models from '../../src/models';
import { TokenPurposes } from '../../src/types';
import { Token } from '../../src/types/models';

describe('invitations controller', () => {
  let createdInvitation: Instance<Token>;

  beforeEach(async () => {
    createdInvitation = await models.Token.create(casual.invitation());
  });

  afterEach(() => {
    return models.Token.destroy({ where: {} });
  });

  describe('sendCode', () => {
    test('should return an error if user with given email already exist', () => {
      return admin.api
        .post('/invitations/send-code')
        .send({ email: admin.details.email })
        .expect(400);
    });

    test('should delete previous invitation if one is already created', async () => {
      await admin.api
        .post('/invitations/send-code')
        .send({ email: createdInvitation.get('email') });

      const invitation = await models.Token.findById(
        createdInvitation.get('id')
      );

      expect(invitation).toBeNull();
    });

    test('should create a new invitation', () => {
      return admin.api
        .post('/invitations/send-code')
        .send({ email: 'test123@mailinator.com' })
        .expect(200);
    });
  });

  describe('checkCode', () => {
    test('should return an error if code is wrong', () => {
      return user.api
        .post('/invitations/check-code')
        .send({ code: 9999 })
        .expect(400);
    });

    test('should end up with a success if code is right', () => {
      return user.api
        .post('/invitations/check-code')
        .send({ code: createdInvitation.get('code') })
        .expect(200);
    });
  });

  describe('confirm', () => {
    test('should return an error if code is wrong', () => {
      return user.api
        .post('/invitations/confirm')
        .send({ code: 9999 })
        .expect(400);
    });

    test('should create a new user if code is right', async () => {
      const newUser = casual.user();

      await user.api
        .post('/invitations/confirm')
        .send({
          code: createdInvitation.get('code'),
          user: newUser
        })
        .expect(200);

      const fetchedUser = await models.User.findOne({
        where: { email: newUser.email }
      });

      expect(fetchedUser).toBeDefined();
    });

    test('should destroy invitation after user has been created successfully', async () => {
      const newUser = casual.user();

      await user.api
        .post('/invitations/confirm')
        .send({
          code: createdInvitation.get('code'),
          user: newUser
        })
        .expect(200);

      const invitation = await models.Token.findOne({
        where: {
          email: newUser.email,
          purpose: TokenPurposes.inviteUser
        }
      });

      expect(invitation).toBeNull();
    });
  });
});

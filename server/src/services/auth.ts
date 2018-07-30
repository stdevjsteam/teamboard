// @flow

import Auth from 'node-jwt-auth';
import models from '../models';

const mapPayloadToUser = async (payload: Auth.Payload) => {
  const { id } = payload.user;
  const { User } = models;

  const user = await User.unscoped().findById(id);

  if (!user) {
    throw new Error();
  }

  return user;
};

const { ACCESS_SECRET, REFRESH_SECRET } = process.env;

if (!ACCESS_SECRET) {
  throw new Error('ACCESS_SECRET is missing');
}

if (!REFRESH_SECRET) {
  throw new Error('REFRESH_SECRET is missing');
}

const auth = new Auth({
  accessSecret: ACCESS_SECRET,
  refreshSecret: REFRESH_SECRET,
  mapUserToHashed: user => user.password,
  mapUserToPayload: user => ({ user: { id: user.id } }),
  mapPayloadToUser,
  accessSingingOptions: {
    expiresIn: '1h'
  }
});

export default auth;

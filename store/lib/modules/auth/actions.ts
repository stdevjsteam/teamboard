import * as constants from './constants';
import { CALL_API, ApiAction } from '../common';
import { user } from '../../schema';

type SignInBody = {
  email: string;
  password: string;
};

export const signIn = (body: SignInBody): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.SIGN_IN_REQUEST,
      constants.SIGN_IN_SUCCESS,
      constants.SIGN_IN_FAILURE
    ],
    endpoint: `/auth/sign-in`,
    method: 'POST',
    body
  }
});

type RefreshTokenBody = {
  refreshToken: string;
};

export const refreshToken = (body: RefreshTokenBody): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.REFRESH_TOKEN_REQUEST,
      constants.REFRESH_TOKEN_SUCCESS,
      constants.REFRESH_TOKEN_FAILURE
    ],
    endpoint: `/auth/refresh-token`,
    method: 'POST',
    body
  }
});

export const fetchCurrentUser = (): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.FETCH_CURRENT_USER_REQUEST,
      constants.FETCH_CURRENT_USER_SUCCESS,
      constants.FETCH_CURRENT_USER_FAILURE
    ],
    endpoint: `/me`,
    schema: user
  }
});

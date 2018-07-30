import { Dispatch } from 'redux';

export const SIGN_IN_REQUEST = 'employee/auth/SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'employee/auth/SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'employee/auth/SIGN_IN_FAILURE';

export const REFRESH_TOKEN_REQUEST = 'employee/auth/REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'employee/auth/REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = 'employee/auth/REFRESH_TOKEN_FAILURE';

export const FETCH_CURRENT_USER_REQUEST =
  'employee/auth/FETCH_CURRENT_USER_REQUEST';
export const FETCH_CURRENT_USER_SUCCESS =
  'employee/auth/FETCH_CURRENT_USER_SUCCESS';
export const FETCH_CURRENT_USER_FAILURE =
  'employee/auth/FETCH_CURRENT_USER_FAILURE';

enum Action {
  FETCH_CURRENT_USER_REQUEST = 'employee/auth/FETCH_CURRENT_USER_REQUEST',
  FETCH_CURRENT_USER_SUCCESS = 'employee/auth/FETCH_CURRENT_USER_SUCCESS'
}

interface Ac {
  type: Action;
}

let d: Dispatch<Ac>;

const u: Ac = {
  type: Action.FETCH_CURRENT_USER_REQUEST
};

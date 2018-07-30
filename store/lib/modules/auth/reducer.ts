import { FETCH_CURRENT_USER_SUCCESS } from './constants';
import { State } from './types';
import { AnyAction } from 'redux';

export const DEFAULT_STATE: State = {};

const auth = (state = DEFAULT_STATE, action: AnyAction) => {
  switch (action.type) {
    case FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.response.result
      };
    default:
      return state;
  }
};

export default auth;

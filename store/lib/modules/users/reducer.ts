import { FETCH_USER_SUCCESS, UPDATE_USER_SUCCESS } from "./constants";
import { State } from "./types";
// import { CLEAR_CURRENT_NEWS } from './constants';
import { AnyAction } from "redux";

export const DEFAULT_STATE: State = {
  list: [],
  current: null
};

const auth = (state = DEFAULT_STATE, action: AnyAction) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        list: action.response.result
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        list: state.list.filter(id => id !== action.requestAction.meta.id)
      };

    default:
      return state;
  }
};

export default auth;

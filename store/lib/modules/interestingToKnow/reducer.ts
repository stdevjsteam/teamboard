import {
  FETCH_INTERESTINGTOKNOW_SUCCESS,
  DELETE_INTERESTINGTOKNOW_SUCCESS,
  FETCH_CURRENT_INTERESTINGTOKNOW_SUCCESS
} from "./constants";
import { State } from "./types";
import { CLEAR_CURRENT_INTERESTINGTOKNOW } from "./constants";
import { AnyAction } from "redux";

export const DEFAULT_STATE: State = {
  list: [],
  current: null
};

const auth = (state = DEFAULT_STATE, action: AnyAction) => {
  switch (action.type) {
    case FETCH_INTERESTINGTOKNOW_SUCCESS:
      return {
        ...state,
        list: action.response.result
      };
    case DELETE_INTERESTINGTOKNOW_SUCCESS:
      return {
        ...state,
        list: state.list.filter(id => id !== +action.response.deletedIds[0])
      };
    case FETCH_CURRENT_INTERESTINGTOKNOW_SUCCESS:
      return {
        ...state,
        current: action.response.result
      };
    case CLEAR_CURRENT_INTERESTINGTOKNOW:
      return {
        ...state,
        current: null
      };
    default:
      return state;
  }
};

export default auth;

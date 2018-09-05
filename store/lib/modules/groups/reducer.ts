import {
  FETCH_GROUPS_SUCCESS
  // DELETE_NEWS_SUCCESS,
  // FETCH_CURRENT_NEWS_SUCCESS
} from "./constants";
import { State } from "./types";
// import { CLEAR_CURRENT_NEWS } from "./constants";
import { AnyAction } from "redux";

export const DEFAULT_STATE: State = {
  list: [],
  current: null
};

const auth = (state = DEFAULT_STATE, action: AnyAction) => {
  switch (action.type) {
    case FETCH_GROUPS_SUCCESS:
      console.log("nasmdnasmdnas", action);
      return {
        ...state,
        list: action.response.result
      };
    // case DELETE_NEWS_SUCCESS:
    //   return {
    //     ...state,
    //     list: state.list.filter(id => id !== +action.response.deletedIds[0])
    //   };
    // case FETCH_CURRENT_NEWS_SUCCESS:
    //   return {
    //     ...state,
    //     current: action.response.result
    //   };
    // case CLEAR_CURRENT_NEWS:
    //   return {
    //     ...state,
    //     current: null
    //   };
    default:
      return state;
  }
};

export default auth;

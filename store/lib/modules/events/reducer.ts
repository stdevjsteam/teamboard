import {
  FETCH_EVENTS_SUCCESS,
  // DELETE_GROUP_SUCCESS,
  FETCH_EVENT_SUCCESS
  // DELETE_MEMBERS_SUCCESS,
  // ADD_MEMBERS_SUCCESS
  // ADD_MEMBERS_SUCCESS
} from './constants';
import { State } from './types';
// import { CLEAR_CURRENT_NEWS } from "./constants";
import { AnyAction } from 'redux';

export const DEFAULT_STATE: State = {
  list: [],
  current: null
};

const auth = (state = DEFAULT_STATE, action: AnyAction) => {
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS:
      console.log('sssssssssssssssss');
      return {
        ...state,
        list: action.response.result
      };
    // case DELETE_GROUP_SUCCESS:
    //   return {
    //     ...state,
    //     list: state.list.filter(id => {
    //       return id !== action.requestAction.meta.id;
    //     })
    //   };
    case FETCH_EVENT_SUCCESS:
      return {
        ...state,
        current: action.response.result
      };
    // case ADD_MEMBERS_SUCCESS:
    //   console.log('addmembers:', action.payload);
    //   return {
    //     ...state,
    //     list: action.response.result
    //   };
    // case DELETE_MEMBERS_SUCCESS:
    //   console.log('ddddd', action);
    //   return {
    //     ...state,
    //     list: state.list
    //   };
    default:
      return state;
  }
};

export default auth;

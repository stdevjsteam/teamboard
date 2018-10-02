import { combineReducers } from 'redux';
import {
  auth,
  errorMessage,
  entities,
  news,
  users,
  groups,
  events,
  interestingToKnow
} from './modules';

export default combineReducers({
  auth: auth.reducer,
  errorMessage: errorMessage.reducer,
  entities: entities.reducer,
  news: news.reducer,
  users: users.reducer,
  events: events.reducer,
  groups: groups.reducer,
  interestingToKnow: interestingToKnow.reducer
});

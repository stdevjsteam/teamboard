import { combineReducers } from 'redux';
import { auth, errorMessage, entities, news } from './modules';

export default combineReducers({
  auth: auth.reducer,
  errorMessage: errorMessage.reducer,
  entities: entities.reducer,
  news: news.reducer
});

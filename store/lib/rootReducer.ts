import { combineReducers } from "redux";
import {
  auth,
  errorMessage,
  entities,
  news,
  groups,
  interestingToKnow
} from "./modules";

export default combineReducers({
  auth: auth.reducer,
  errorMessage: errorMessage.reducer,
  entities: entities.reducer,
  news: news.reducer,
  groups: groups.reducer,
  interestingToKnow: interestingToKnow.reducer
});

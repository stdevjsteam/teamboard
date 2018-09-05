import { merge } from "lodash";
import { common } from ".";
import { AnyAction } from "redux";

type Entity<T> = {
  [key: number]: T;
};

export type User = {
  id: common.Id;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
};

export type News = {
  id: common.Id;
  title: string;
  body: string;
  photo: string;
};

export type InterestingToKnow = {
  id: common.Id;
  title: string;
  body: string;
  photo: string;
};
export type Groups = {
  id: common.Id;
  name: string;
  users: User[];
  push: any;
};

export type State = {
  users: Entity<User>;
  news: Entity<News>;
  interestingToKnow: Entity<InterestingToKnow>;
  groups: Entity<Groups>;
};

const DEFAULT_STATE: State = {
  users: {},
  news: {},
  interestingToKnow: {},
  groups: {}
};

// Updates an entity cache in response to any action with response.entities.
export const reducer = (state = DEFAULT_STATE, action: AnyAction) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
};

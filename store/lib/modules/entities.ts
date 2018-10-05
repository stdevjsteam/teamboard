import { mergeWith } from 'lodash';
import { common } from '.';
import { AnyAction } from 'redux';

type Entity<T> = {
  [key: number]: T;
};

export type User = {
  id: common.Id;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  position: string;
};

export type News = {
  id: common.Id;
  title: string;
  body: string;
  image: string;
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
  members: User[];
  push: any;
};
export type Events = {
  id: common.Id;
  title: string;
  time: Date;
  image: string;
  description: string;
  location: string;
};

export type State = {
  users: Entity<User>;
  news: Entity<News>;
  interestingToKnow: Entity<InterestingToKnow>;
  events: Entity<Events>;
  groups: Entity<Groups>;
};

const DEFAULT_STATE: State = {
  users: {},
  news: {},
  interestingToKnow: {},
  groups: {},
  events: {}
};

const customizer = (
  objValue: any,
  srcValue: any,
  key: any,
  object: any,
  source: any,
  stack: any
) => {
  return undefined;
};

// Updates an entity cache in response to any action with response.entities.
export const reducer = (state = DEFAULT_STATE, action: AnyAction) => {
  if (action.response && action.response.entities) {
    return mergeWith({}, state, action.response.entities, customizer);
  }

  return state;
};

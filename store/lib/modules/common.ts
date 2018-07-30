import { Dispatch as ReduxDispatch } from 'redux';
import { Schema } from 'normalizr';
import { auth, entities, errorMessage, news } from '.';

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'CALL_API';

export type Id = number;

export type ApiAction = {
  [CALL_API]: {
    types: [string, string, string];
    endpoint: string;
    method?: string;
    body?: object;
    schema?: Schema;
  };
};

export type StoreState = {
  auth: auth.State;
  entities: entities.State;
  errorMessage: errorMessage.State;
  news: news.State;
};

export type Dispatch = ReduxDispatch<any>;
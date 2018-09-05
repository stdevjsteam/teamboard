import * as constants from './constants';
import { news } from '../../schema';
import { ApiAction, CALL_API, Id } from '../common';

export const fetchNews = (): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.FETCH_NEWS_REQUEST,
      constants.FETCH_NEWS_SUCCESS,
      constants.FETCH_NEWS_FAILURE
    ],
    endpoint: `/news`,
    schema: [news]
  }
});

export const fetchCurrentNews = (id: Id): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.FETCH_CURRENT_NEWS_REQUEST,
      constants.FETCH_CURRENT_NEWS_SUCCESS,
      constants.FETCH_CURRENT_NEWS_FAILURE
    ],
    endpoint: `/news/${id}`,
    schema: news
  }
});

export const clearCurrentNews = () => ({
  type: constants.CLEAR_CURRENT_NEWS
});

type CreateNewsBody = {
  title: string;
  body: string;
};

export const createNews = (body: CreateNewsBody): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.CREATE_NEWS_REQUEST,
      constants.CREATE_NEWS_SUCCESS,
      constants.CREATE_NEWS_FAILURE
    ],
    endpoint: `/news`,
    method: 'POST',
    schema: news,
    body
  }
});

type UpdateNewsBody = {
  title?: string;
  body?: string;
};

export const updateNews = (id: Id, body: UpdateNewsBody): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.UPDATE_NEWS_REQUEST,
      constants.UPDATE_NEWS_SUCCESS,
      constants.UPDATE_NEWS_FAILURE
    ],
    endpoint: `/news/${id}`,
    method: "PATCH",
    schema: news,
    body
  }
});

export const deleteNews = (id: Id): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.DELETE_NEWS_REQUEST,
      constants.DELETE_NEWS_SUCCESS,
      constants.DELETE_NEWS_FAILURE
    ],
    endpoint: `/news/${id}`,
    method: 'DELETE'
  },
  meta: { id }
});

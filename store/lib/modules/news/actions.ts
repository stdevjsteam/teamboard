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
    endpoint: `/news/${id}?associations=groups`,
    schema: news
  }
});

export const clearCurrentNews = () => ({
  type: constants.CLEAR_CURRENT_NEWS
});

type CreateNewsBody = {
  title: string;
  description: string;
  commentsOpen: boolean;
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
  description?: string;
};

export const updateNews = (id: Id, body: UpdateNewsBody): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.UPDATE_NEWS_REQUEST,
      constants.UPDATE_NEWS_SUCCESS,
      constants.UPDATE_NEWS_FAILURE
    ],
    endpoint: `/news/${id}`,
    method: 'PATCH',
    schema: news,
    body
  }
});

type AddGroups = {
  groupIds: number[];
};

export const addGroups = (id: Id, body: AddGroups): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.UPDATE_NEWS_REQUEST,
      constants.UPDATE_NEWS_SUCCESS,
      constants.UPDATE_NEWS_FAILURE
    ],
    endpoint: `/news/${id}/add-groups`,
    method: 'POST',
    schema: news,
    body
  }
});
type deleteGroups = {
  groupIds: number[];
};
export const deleteGroups = (id: Id, body: deleteGroups): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.DELETE_GROUPS_REQUEST,
      constants.DELETE_GROUPS_SUCCESS,
      constants.DELETE_GROUPS_FAILURE
    ],
    endpoint: `/news/${id}/delete-groups`,
    method: 'POST',
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

type UploadPhotoBody = {
  file: string;
  newsId: number;
  purpose: string;
};

export const uploadImage = (body: UploadPhotoBody): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.UPLOAD_NEWS_PHOTO_REQUEST,
      constants.UPLOAD_NEWS_PHOTO_SUCCESS,
      constants.UPLOAD_NEWS_PHOTO_FAILURE
    ],
    endpoint: `/files`,
    method: 'POST',
    body,
    schema: news
  }
});

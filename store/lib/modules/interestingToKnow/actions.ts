import * as constants from './constants';
import { interestingToKnow } from '../../schema';
import { ApiAction, CALL_API, Id } from '../common';

export const fetchInterestingToKnow = (): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.FETCH_INTERESTINGTOKNOW_REQUEST,
      constants.FETCH_INTERESTINGTOKNOW_SUCCESS,
      constants.FETCH_INTERESTINGTOKNOW_FAILURE
    ],
    endpoint: `/interesting-to-knows`,
    schema: [interestingToKnow]
  }
});

export const fetchCurrentInterestingToKnow = (id: Id): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.FETCH_CURRENT_INTERESTINGTOKNOW_REQUEST,
      constants.FETCH_CURRENT_INTERESTINGTOKNOW_SUCCESS,
      constants.FETCH_CURRENT_INTERESTINGTOKNOW_FAILURE
    ],
    endpoint: `/interesting-to-knows/${id}?associations=groups`,
    schema: interestingToKnow
  }
});

export const clearCurrentInterestingToKnow = () => ({
  type: constants.CLEAR_CURRENT_INTERESTINGTOKNOW
});

type CreateInterestingToKnowBody = {
  title: string;
  description: string;
  commentsOpen: boolean;
};

export const createInterestingToKnow = (
  body: CreateInterestingToKnowBody
): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.CREATE_INTERESTINGTOKNOW_REQUEST,
      constants.CREATE_INTERESTINGTOKNOW_SUCCESS,
      constants.CREATE_INTERESTINGTOKNOW_FAILURE
    ],
    endpoint: `/interesting-to-knows`,
    method: 'POST',
    schema: interestingToKnow,
    body
  }
});

type UpdateInterestingToKnowBody = {
  title?: string;
  description?: string;
};

export const updateInterestingToKnow = (
  id: Id,
  body: UpdateInterestingToKnowBody
): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.UPDATE_INTERESTINGTOKNOW_REQUEST,
      constants.UPDATE_INTERESTINGTOKNOW_SUCCESS,
      constants.UPDATE_INTERESTINGTOKNOW_FAILURE
    ],
    endpoint: `/interesting-to-knows/${id}`,
    method: 'PATCH',
    schema: interestingToKnow,
    body
  }
});

type AddGroups = {
  groupIds: number[];
};

export const addGroups = (id: Id, body: AddGroups): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.UPDATE_INTERESTINGTOKNOW_REQUEST,
      constants.UPDATE_INTERESTINGTOKNOW_SUCCESS,
      constants.UPDATE_INTERESTINGTOKNOW_FAILURE
    ],
    endpoint: `/interesting-to-knows/${id}/add-groups`,
    method: 'POST',
    schema: interestingToKnow,
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
    endpoint: `/interesting-to-knows/${id}/delete-groups`,
    method: 'POST',
    schema: interestingToKnow,
    body
  }
});

export const deleteInterestingToKnow = (id: Id): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.DELETE_INTERESTINGTOKNOW_REQUEST,
      constants.DELETE_INTERESTINGTOKNOW_SUCCESS,
      constants.DELETE_INTERESTINGTOKNOW_FAILURE
    ],
    endpoint: `/interesting-to-knows/${id}`,
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
      constants.UPLOAD_INTERESTINGTOKNOW_PHOTO_REQUEST,
      constants.UPLOAD_INTERESTINGTOKNOW_PHOTO_SUCCESS,
      constants.UPLOAD_INTERESTINGTOKNOW_PHOTO_FAILURE
    ],
    endpoint: `/files`,
    method: 'POST',
    body,
    schema: interestingToKnow
  }
});

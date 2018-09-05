import * as constants from "./constants";
import { interestingToKnow } from "../../schema";
import { ApiAction, CALL_API, Id } from "../common";

export const fetchInterestingToKnow = (): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.FETCH_INTERESTINGTOKNOW_REQUEST,
      constants.FETCH_INTERESTINGTOKNOW_SUCCESS,
      constants.FETCH_INTERESTINGTOKNOW_FAILURE
    ],
    endpoint: `/interestingToKnow`,
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
    endpoint: `/interestingToKnow/${id}`,
    schema: interestingToKnow
  }
});

export const clearCurrentInterestingToKnow = () => ({
  type: constants.CLEAR_CURRENT_INTERESTINGTOKNOW
});

type CreateInterestingToKnowBody = {
  title: string;
  body: string;
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
    endpoint: `/interestingToKnow`,
    method: "POST",
    schema: interestingToKnow,
    body
  }
});

type UpdateInterestingToKnowBody = {
  title?: string;
  body?: string;
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
    endpoint: `/interestingToKnow/${id}`,
    method: "PATCH",
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
    endpoint: `/interestingToKnow/${id}`,
    method: "DELETE"
  }
});

type UploadPhotoBody = {
  file: string;
  purpose: string;
};

export const uploadPhoto = (body: UploadPhotoBody): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.UPLOAD_INTERESTINGTOKNOW_PHOTO_REQUEST,
      constants.UPLOAD_INTERESTINGTOKNOW_PHOTO_SUCCESS,
      constants.UPLOAD_INTERESTINGTOKNOW_PHOTO_FAILURE
    ],
    endpoint: `/files`,
    method: "POST",
    body
  }
});

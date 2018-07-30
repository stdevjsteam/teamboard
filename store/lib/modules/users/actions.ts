import * as constants from './constants';
import { user } from '../../schema';
import { ApiAction, CALL_API } from '../common';
import { User } from '../entities';

type UpdateUserBody = Partial<User>;

export const updateUser = (body: UpdateUserBody): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.UPDATE_USER_REQUEST,
      constants.UPDATE_USER_SUCCESS,
      constants.UPDATE_USER_FAILURE
    ],
    endpoint: `/users/edit-profile`,
    method: 'POST',
    body,
    schema: user
  }
});

type UploadPhotoBody = {
  file: string;
  purpose: string;
};

export const uploadPhoto = (body: UploadPhotoBody): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.UPLOAD_PHOTO_REQUEST,
      constants.UPLOAD_PHOTO_SUCCESS,
      constants.UPLOAD_PHOTO_FAILURE
    ],
    endpoint: `/files`,
    method: 'POST',
    body,
    schema: user
  }
});

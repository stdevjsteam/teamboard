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

type UploadImageBody = {
  file: string;
  purpose: string;
};

export const uploadImage = (body: UploadImageBody): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.UPLOAD_IMAGE_REQUEST,
      constants.UPLOAD_IMAGE_SUCCESS,
      constants.UPLOAD_IMAGE_FAILURE
    ],
    endpoint: `/files`,
    method: 'POST',
    body,
    schema: user
  }
});

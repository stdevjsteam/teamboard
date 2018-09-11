import { ApiAction, CALL_API } from '../common';
import * as constants from './constants';

type SendCodeBody = {
  email: string;
};

export const sendCode = (body: SendCodeBody): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.SEND_CODE_REQUEST,
      constants.SEND_CODE_SUCCESS,
      constants.SEND_CODE_FAILURE
    ],
    endpoint: `/invitations/send-code`,
    method: 'POST',
    body
  }
});

type CheckCodeBody = {
  code: string;
};

export const checkCode = (body: CheckCodeBody): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.CHECK_CODE_REQUEST,
      constants.CHECK_CODE_SUCCESS,
      constants.CHECK_CODE_FAILURE
    ],
    endpoint: `/invitations/check-code`,
    method: 'POST',
    body
  }
});

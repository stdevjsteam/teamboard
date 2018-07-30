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

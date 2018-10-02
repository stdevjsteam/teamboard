import * as constants from './constants';

import { events } from './../../schema';
import { ApiAction, CALL_API } from '../common';
// import { common } from '../..';

export const fetchEvents = (): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.FETCH_EVENTS_REQUEST,
      constants.FETCH_EVENTS_SUCCESS,
      constants.FETCH_EVENTS_FAILURE
    ],
    endpoint: `/events`,
    schema: [events]
  }
});

// export const fetchGroup = (id: Id): ApiAction => ({
//   [CALL_API]: {
//     types: [
//       constants.FETCH_GROUP_REQUEST,
//       constants.FETCH_GROUP_SUCCESS,
//       constants.FETCH_GROUP_FAILURE
//     ],
//     endpoint: `/groups/${id}?associations=members`,
//     schema: groups
//   }
// });

type CreateGroupBody = {
  name: string;
};

export const createGroup = (body: CreateGroupBody): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.CREATE_EVENTS_REQUEST,
      constants.CREATE_EVENTS_SUCCESS,
      constants.CREATE_EVENTS_FAILURE
    ],
    endpoint: `/events`,
    method: 'POST',
    schema: events,
    body
  }
});

// export type Member = {
//   id: common.Id;
//   role: 'member' | 'tl' | 'pm';
// };

// type AddMembersBody = {
//   members: Member[];
// };

// export const addMembers = (id: common.Id, body: AddMembersBody): ApiAction => ({
//   [CALL_API]: {
//     types: [
//       constants.ADD_MEMBERS_REQUEST,
//       constants.ADD_MEMBERS_SUCCESS,
//       constants.ADD_MEMBERS_FAILURE
//     ],
//     endpoint: `/groups/${id}/add-members`,
//     method: 'POST',
//     body
//   }
// });

// type DeleteMembersBody = {
//   memberIds: common.Id[];
// };

// export const deleteMembers = (
//   id: common.Id,
//   body: DeleteMembersBody
// ): ApiAction => ({
//   [CALL_API]: {
//     types: [
//       constants.DELETE_MEMBERS_REQUEST,
//       constants.DELETE_MEMBERS_SUCCESS,
//       constants.DELETE_MEMBERS_FAILURE
//     ],
//     endpoint: `/groups/${id}/delete-members`,
//     method: 'POST',
//     body
//   }
// });

// export const deleteGroup = (id: common.Id): ApiAction => ({
//   [CALL_API]: {
//     types: [
//       constants.DELETE_GROUP_REQUEST,
//       constants.DELETE_GROUP_SUCCESS,
//       constants.DELETE_GROUP_FAILURE
//     ],
//     endpoint: `/groups/${id}`,
//     method: 'DELETE'
//   },
//   meta: { id }
// });

// type UpdateGroupBody = {
//   name: string;
// };
// export const editGroup = (id: common.Id, body: UpdateGroupBody): ApiAction => ({
//   [CALL_API]: {
//     types: [
//       constants.EDIT_GROUP_REQUEST,
//       constants.EDIT_GROUP_SUCCESS,
//       constants.EDIT_GROUP_FAILURE
//     ],
//     endpoint: `/groups/${id}`,
//     method: 'PATCH',
//     body
//   },
//   meta: { id }
// });

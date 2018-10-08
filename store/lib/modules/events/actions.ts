import * as constants from './constants';

import { events } from './../../schema';
import { ApiAction, CALL_API, Id } from '../common';
import { common } from '../..';

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

export const fetchEvent = (id: Id): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.FETCH_EVENT_REQUEST,
      constants.FETCH_EVENT_SUCCESS,
      constants.FETCH_EVENT_FAILURE
    ],
    endpoint: `/events/${id}`,
    schema: events
  }
});

type CreateGroupBody = {
  title: string;
  description: string;
  time: string;
  location: string;
};

export const createEvents = (body: CreateGroupBody): ApiAction => ({
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

type DeleteMembersBody = {
  memberIds: common.Id[];
};

export const deleteEvent = (id: common.Id): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.DELETE_EVENT_REQSUET,
      constants.DELETE_EVENT_SUCCESS,
      constants.DELETE_EVENT_FAILURE
    ],
    endpoint: `/events/${id}`,
    method: 'DELETE'
  },
  meta: { id }
});

type UpdateEventBody = {
  title: string;
  description: string;
  time: string;
  location: string;
};
export const editEvent = (id: common.Id, body: UpdateEventBody): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.EDIT_EVENT_REQUEST,
      constants.EDIT_EVENT_SUCCESS,
      constants.EDIT_EVENT_FAILURE
    ],
    endpoint: `/events/${id}`,
    method: 'PATCH',
    body
  },
  meta: { id }
});

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

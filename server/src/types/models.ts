import { TokenPurposes, GroupRoles } from './';
import { UserRoles } from './index';

interface Base {
  id?: number;
}

export interface News extends Base {
  title: string;
  description: string;
  image: string;
  commentsOpen: boolean;
}

export interface InterestingToKnow extends Base {
  title: string;
  description: string;
  image: string;
  commentsOpen: boolean;
}

export interface User extends Base {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  plainPassword?: string;
  image: string;
  active: boolean;
  role: UserRoles;
  phoneNumber: string;
  position: string;
}

export interface Token extends Base {
  email: string;
  code: number;
  purpose: TokenPurposes;
}

export interface Group extends Base {
  name: string;
}

export interface GroupMember {
  groupId: number;
  memberId: number;
  role: GroupRoles;
}

export interface NewsGroup {
  groupId: number;
  newsId: number;
}

export interface InterestingToKnowGroup {
  groupId: number;
  interestingToKnowId: number;
}

export interface Event extends Base {
  title: string;
  time: string;
  image: string;
  description: string;
  location: string;
}

export interface EventGroup {
  groupId: number;
  eventId: number;
}

export interface Notification extends Base {
  title: string;
  message: string;
}

export interface NotificationGroup {
  notificationId: number;
  groupId: number;
}

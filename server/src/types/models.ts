import { TokenPurposes, GroupRoles } from './';

interface Base {
  id?: number;
}

export interface News extends Base {
  title: string;
  body: string;
  image: string;
}

export interface User extends Base {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photo: string;
}

export interface Token extends Base {
  email: string;
  code: number;
  purpose: TokenPurposes;
}

export interface Group extends Base {
  name: string;
}

export interface GroupMembers extends Base {
  role: GroupRoles;
}

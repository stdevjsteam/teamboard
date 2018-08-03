import { TokenPurposes } from './';

export interface News {
  title: string;
  body: string;
  photo: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photo: string;
}

export interface Token {
  email: string;
  code: number;
  purpose: TokenPurposes;
}

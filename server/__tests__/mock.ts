import { TokenPurposes } from '../src/types';
import * as casual from 'casual';

casual.define('user', (data = {}) => {
  return {
    id: casual.integer(0, 1000000),
    firstName: casual.first_name,
    lastName: casual.last_name,
    email: casual.email,
    password: '$2y$12$GQG6PQGgLqZ8IYQU.ikTlOAQe43Z0fshvb//fH4Eug83SD8YEA0li',
    plainPassword: 'admin123',
    image: 'bla_bla',
    role: 'user',
    ...data
  };
});

casual.define('news', (data = {}) => {
  return {
    id: casual.integer(0, 1000000),
    title: casual.title,
    body: casual.text,
    ...data
  };
});

casual.define('invitation', (data = {}) => {
  return {
    id: casual.integer(0, 1000000),
    email: casual.email,
    code: casual.integer(1000, 9999),
    purpose: TokenPurposes.inviteUser,
    ...data
  };
});

casual.define('group', (data = {}) => {
  return {
    name: casual.name,
    ...data
  };
});

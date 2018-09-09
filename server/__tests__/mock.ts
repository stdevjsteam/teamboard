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
    image: casual.url,
    role: 'user',
    active: true,
    position: 'dev',
    phoneNumber: '+37444787878',
    ...data
  };
});

casual.define('news', (data = {}) => {
  return {
    id: casual.integer(0, 1000000),
    title: casual.title,
    description: casual.text,
    commentsOpen: true,
    ...data
  };
});

casual.define('interestingToKnow', (data = {}) => {
  return {
    id: casual.integer(0, 1000000),
    title: casual.title,
    description: casual.text,
    commentsOpen: true,
    ...data
  };
});

casual.define('event', (data = {}) => {
  return {
    id: casual.integer(0, 1000000),
    title: casual.title,
    time: new Date().toISOString(),
    image: casual.url,
    description: casual.text,
    location: casual.text,
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

export default casual;

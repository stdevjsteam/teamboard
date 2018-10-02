import { schema } from 'normalizr';

export const user = new schema.Entity('users');
export const news = new schema.Entity('news');

export const groups = new schema.Entity('groups', {
  members: [user]
});
export const interestingToKnow = new schema.Entity('interestingToKnow');

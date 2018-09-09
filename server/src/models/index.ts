import Sequelize, {
  DefineAttributes,
  DefineAttributeColumnOptions,
  Instance
} from 'sequelize';
import { decamelize } from 'humps';
import {
  User,
  News,
  Token,
  Group,
  GroupMember,
  InterestingToKnow,
  Event,
  NewsGroup,
  InterestingToKnowGroup,
  EventGroup,
  Notification,
  NotificationGroup
} from '../types/models';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json');

const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  { ...config[env], ...config.common }
);

const models = {
  sequelize,
  Sequelize,
  User: sequelize.import<Instance<User>, User>(__dirname + '/user.ts'),
  News: sequelize.import<Instance<News>, News>(__dirname + '/news.ts'),
  InterestingToKnow: sequelize.import<
    Instance<InterestingToKnow>,
    InterestingToKnow
  >(__dirname + '/interestingToKnow.ts'),
  Token: sequelize.import<Instance<Token>, Token>(__dirname + '/token.ts'),
  Group: sequelize.import<Instance<Group>, Group>(__dirname + '/group.ts'),
  GroupMember: sequelize.import<Instance<GroupMember>, GroupMember>(
    __dirname + '/groupMember.ts'
  ),
  NewsGroup: sequelize.import<Instance<NewsGroup>, NewsGroup>(
    __dirname + '/newsGroup.ts'
  ),
  InterestingToKnowGroup: sequelize.import<
    Instance<InterestingToKnowGroup>,
    InterestingToKnowGroup
  >(__dirname + '/interestingToKnowGroup.ts'),
  Event: sequelize.import<Instance<Event>, Event>(__dirname + '/event.ts'),
  EventGroup: sequelize.import<Instance<EventGroup>, EventGroup>(
    __dirname + '/eventGroup.ts'
  ),
  Notification: sequelize.import<Instance<Notification>, Notification>(
    __dirname + '/notification.ts'
  ),
  NotificationGroup: sequelize.import<
    Instance<NotificationGroup>,
    NotificationGroup
  >(__dirname + '/notificationGroup.ts')
};

// convert camelCased fields to under_score
sequelize.addHook('beforeDefine', (attributes: DefineAttributes) => {
  Object.keys(attributes).forEach(key => {
    const column = attributes[key] as DefineAttributeColumnOptions;

    if (typeof column !== 'function' && !column.field) {
      column.field = decamelize(key);
    }
  });
});

Object.keys(models).forEach(key => {
  const model = (models as any)[key];

  if (model.associate) {
    model.associate(models);
  }
});

export default models;

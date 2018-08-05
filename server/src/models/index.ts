import Sequelize, {
  DefineAttributes,
  DefineAttributeColumnOptions,
  Instance
} from 'sequelize';
import { decamelize } from 'humps';
import { User, News, Token, Group, GroupMembers } from '../types/models';

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
  Token: sequelize.import<Instance<Token>, Token>(__dirname + '/token.ts'),
  Group: sequelize.import<Instance<Group>, Group>(__dirname + '/group.ts'),
  GroupMembers: sequelize.import<Instance<GroupMembers>, GroupMembers>(
    __dirname + '/groupMembers.ts'
  )
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

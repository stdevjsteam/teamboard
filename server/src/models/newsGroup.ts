import { SequelizeStatic, Sequelize as _Sequelize } from 'sequelize';

export default (sequelize: _Sequelize, DataTypes: SequelizeStatic) => {
  const NewsGroup = sequelize.define('news_group', {});

  return NewsGroup;
};

import { SequelizeStatic, Sequelize as _Sequelize } from 'sequelize';

export default (sequelize: _Sequelize, DataTypes: SequelizeStatic) => {
  const EventGroup = sequelize.define('event_group', {});

  return EventGroup;
};

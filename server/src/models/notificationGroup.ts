import { SequelizeStatic, Sequelize as _Sequelize } from 'sequelize';

export default (sequelize: _Sequelize, DataTypes: SequelizeStatic) => {
  const NotificationGroup = sequelize.define('notification_group', {});

  return NotificationGroup;
};

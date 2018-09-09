import { SequelizeStatic, Sequelize as _Sequelize } from 'sequelize';

export default (sequelize: _Sequelize, DataTypes: SequelizeStatic) => {
  const Notification = sequelize.define('notification', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        max: 50
      }
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        max: 200
      }
    }
  });

  Notification.associate = ({ Group, NotificationGroup }) => {
    Notification.belongsToMany(Group, {
      as: 'groups',
      through: NotificationGroup,
      foreignKey: { name: 'notificationId', field: 'notification_id' }
    });
  };

  return Notification;
};

import { SequelizeStatic, Sequelize as _Sequelize } from 'sequelize';

export default (sequelize: _Sequelize, DataTypes: SequelizeStatic) => {
  const Group = sequelize.define('group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 50,
        notEmpty: true
      }
    }
  });

  Group.associate = ({
    User,
    GroupMember,
    NewsGroup,
    News,
    InterestingToKnow,
    InterestingToKnowGroup,
    Event,
    EventGroup,
    Notification,
    NotificationGroup
  }) => {
    Group.belongsToMany(User, {
      as: 'members',
      through: GroupMember,
      foreignKey: { name: 'groupId', field: 'group_id' }
    });

    Group.belongsToMany(News, {
      as: 'news',
      through: NewsGroup,
      foreignKey: { name: 'groupId', field: 'group_id' }
    });

    Group.belongsToMany(InterestingToKnow, {
      as: 'interestingToKnows',
      through: InterestingToKnowGroup,
      foreignKey: { name: 'groupId', field: 'group_id' }
    });

    Group.belongsToMany(Event, {
      as: 'events',
      through: EventGroup,
      foreignKey: { name: 'groupId', field: 'group_id' }
    });

    Group.belongsToMany(Notification, {
      as: 'notifications',
      through: NotificationGroup,
      foreignKey: { name: 'notificationId', field: 'notification_id' }
    });
  };

  return Group;
};

import { SequelizeStatic, Sequelize as _Sequelize } from 'sequelize';

export default (sequelize: _Sequelize, DataTypes: SequelizeStatic) => {
  const Group = sequelize.define('group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 20,
        notEmpty: true
      }
    }
  });

  Group.associate = ({ User, GroupMembers }) => {
    Group.belongsToMany(User, {
      as: 'members',
      through: GroupMembers,
      foreignKey: { name: 'groupId', field: 'group_id' }
    });
  };

  return Group;
};

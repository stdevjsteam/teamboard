import { SequelizeStatic, Sequelize as _Sequelize } from 'sequelize';

export default (sequelize: _Sequelize, DataTypes: SequelizeStatic) => {
  const GroupMembers = sequelize.define('group_members', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    role: {
      type: DataTypes.ENUM('member', 'tl', 'pm'),
      allowNull: false
    }
  });

  return GroupMembers;
};

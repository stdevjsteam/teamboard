import { SequelizeStatic, Sequelize as _Sequelize } from 'sequelize';
import { GroupRoles } from '../types';

export default (sequelize: _Sequelize, DataTypes: SequelizeStatic) => {
  const GroupMembers = sequelize.define('group_members', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    role: {
      type: DataTypes.ENUM(GroupRoles.member, GroupRoles.tl, GroupRoles.pm),
      allowNull: false
    }
  });

  return GroupMembers;
};

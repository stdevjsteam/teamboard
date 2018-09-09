import { SequelizeStatic, Sequelize as _Sequelize } from 'sequelize';
import { GroupRoles } from '../types';

export default (sequelize: _Sequelize, DataTypes: SequelizeStatic) => {
  const GroupMember = sequelize.define('group_member', {
    role: {
      type: DataTypes.ENUM(GroupRoles.member, GroupRoles.tl, GroupRoles.pm),
      allowNull: false
    }
  });

  return GroupMember;
};

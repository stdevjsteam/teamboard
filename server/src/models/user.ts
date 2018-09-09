import { hashPassword } from '../services/password';
import { SequelizeStatic, Sequelize as _Sequelize } from 'sequelize';
import { UserRoles } from '../types/index';

export default (sequelize: _Sequelize, DataTypes: SequelizeStatic) => {
  const User = sequelize.define(
    'user',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          max: 20,
          notEmpty: true
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          max: 20,
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 60]
        }
      },
      image: {
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.ENUM(UserRoles.admin, UserRoles.user)
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/
        }
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },
    {
      defaultScope: {
        attributes: { exclude: ['password', 'role', 'active'] }
      }
    }
  );

  User.addHook('beforeSave', hashPassword);

  User.associate = ({ Group, GroupMember }) => {
    User.belongsToMany(Group, {
      as: 'groups',
      through: GroupMember,
      foreignKey: { name: 'memberId', field: 'member_id' }
    });
  };

  return User;
};

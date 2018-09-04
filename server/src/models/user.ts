import { hashPassword } from '../services/password';
import { SequelizeStatic, Sequelize as _Sequelize } from 'sequelize';

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
        type: DataTypes.ENUM('admin', 'user')
      }
    },
    {
      defaultScope: {
        attributes: { exclude: ['password', 'role'] }
      }
    }
  );

  User.addHook('beforeSave', hashPassword);

  User.associate = ({ Group, GroupMembers }) => {
    User.belongsToMany(Group, {
      as: 'groups',
      through: GroupMembers,
      foreignKey: { name: 'memberId', field: 'member_id' }
    });
  };

  return User;
};

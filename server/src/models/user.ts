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
      photo: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      defaultScope: {
        attributes: { exclude: ['password'] }
      }
    }
  );

  User.addHook('beforeSave', hashPassword);

  return User;
};

import { SequelizeStatic, Sequelize as _Sequelize } from 'sequelize';
import { TokenPurposes } from '../types';

export default (sequelize: _Sequelize, DataTypes: SequelizeStatic) => {
  const Token = sequelize.define('token', {
    code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    purpose: {
      type: DataTypes.ENUM(
        TokenPurposes.inviteUser,
        TokenPurposes.resetPassword
      ),
      allowNull: false
    }
  });

  return Token;
};

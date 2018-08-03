import { SequelizeStatic, Sequelize as _Sequelize } from 'sequelize';

export default (sequelize: _Sequelize, DataTypes: SequelizeStatic) => {
  const News = sequelize.define('news', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 20,
        notEmpty: true
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return News;
};

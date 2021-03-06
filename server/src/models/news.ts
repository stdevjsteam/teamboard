import { SequelizeStatic, Sequelize as _Sequelize } from 'sequelize';

export default (sequelize: _Sequelize, DataTypes: SequelizeStatic) => {
  const News = sequelize.define('news', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 50,
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    image: {
      type: DataTypes.STRING
    },
    commentsOpen: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  News.associate = ({ Group, NewsGroup }) => {
    News.belongsToMany(Group, {
      as: 'groups',
      through: NewsGroup,
      foreignKey: { name: 'newsId', field: 'news_id' }
    });
  };

  return News;
};

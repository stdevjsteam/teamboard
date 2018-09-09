import { SequelizeStatic, Sequelize as _Sequelize } from 'sequelize';

export default (sequelize: _Sequelize, DataTypes: SequelizeStatic) => {
  const InterestingToKnow = sequelize.define('interesting_to_know', {
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

  InterestingToKnow.associate = ({ Group, InterestingToKnowGroup }) => {
    InterestingToKnow.belongsToMany(Group, {
      as: 'groups',
      through: InterestingToKnowGroup,
      foreignKey: {
        name: 'interestingToKnowId',
        field: 'interesting_to_know_id'
      }
    });
  };

  return InterestingToKnow;
};

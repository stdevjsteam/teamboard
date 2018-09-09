import { SequelizeStatic, Sequelize as _Sequelize } from 'sequelize';

export default (sequelize: _Sequelize, DataTypes: SequelizeStatic) => {
  const Event = sequelize.define('event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 50,
        notEmpty: true
      }
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  Event.associate = ({ Group, EventGroup }) => {
    Event.belongsToMany(Group, {
      as: 'groups',
      through: EventGroup,
      foreignKey: { name: 'eventId', field: 'event_id' }
    });
  };

  return Event;
};

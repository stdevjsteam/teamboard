import { SequelizeStatic, Sequelize as _Sequelize } from 'sequelize';

export default (sequelize: _Sequelize, DataTypes: SequelizeStatic) => {
  const InterestingToKnowGroup = sequelize.define(
    'interesting_to_know_group',
    {}
  );

  return InterestingToKnowGroup;
};

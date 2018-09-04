'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        // plainPassword: 'admin123',
        {
          id: 1,
          firstName: 'Admin',
          lastName: 'Admin',
          email: 'teamboard_ad@mailinator.com',
          password:
            '$2y$12$GQG6PQGgLqZ8IYQU.ikTlOAQe43Z0fshvb//fH4Eug83SD8YEA0li',

          image: 'bla_bla',
          role: 'admin'
        },
        // plainPassword: 'user123',
        {
          id: 2,
          firstName: 'User',
          lastName: 'User',
          email: 'teamboard_us@mailinator.com',
          password:
            '$2y$12$T8hRump3y2VtAoZIifjOTODc7FgExc50s8PjVO2e4FDvmKITq5UVO',
          image: 'bla_bla',
          role: 'user'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  }
};

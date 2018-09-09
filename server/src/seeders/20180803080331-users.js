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
          position: 'developer',
          phoneNumber: '+374546546545',
          email: 'teamboard_ad@mailinator.com',
          password:
            '$2y$12$GQG6PQGgLqZ8IYQU.ikTlOAQe43Z0fshvb//fH4Eug83SD8YEA0li',
          role: 'admin'
        },
        // plainPassword: 'user123',
        {
          id: 2,
          firstName: 'User',
          lastName: 'User',
          position: 'developer',
          phoneNumber: '+3746569865',
          email: 'teamboard_us@mailinator.com',
          password:
            '$2y$12$T8hRump3y2VtAoZIifjOTODc7FgExc50s8PjVO2e4FDvmKITq5UVO',
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

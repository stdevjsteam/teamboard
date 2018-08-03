'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          firstName: 'Admin',
          lastName: 'Admin',
          email: 'admin@gmail.com',
          password:
            '$2y$12$BXw73sMzNUiusKmLkz9mje9V1pOEmXoj.GMWDEGe4X7EZYO3cXFgy',
          photo: 'bla_bla',
          role: 'admin'
        },
        {
          firstName: 'User',
          lastName: 'User',
          email: 'user@gmail.com',
          password:
            '$2y$12$3OZtWosBXjIfXDRcwzvLUuuSSXae/GjRz6r0ZwHhIttsKlBStsOzO',
          photo: 'bla_bla',
          role: 'user'
        },
        {
          firstName: 'User',
          lastName: 'User',
          email: 'hovhannes.st.dev@gmail.com',
          password:
            '$2y$12$3OZtWosBXjIfXDRcwzvLUuuSSXae/GjRz6r0ZwHhIttsKlBStsOzO',
          photo: 'bla_bla',
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

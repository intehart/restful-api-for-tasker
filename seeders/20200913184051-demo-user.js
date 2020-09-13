'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('user', [{
      username: 'root',
      auth_token: await bcrypt.hash('auth_token', 12),
      email: 'root@root.root',
      password: await bcrypt.hash('root', 12),
      createdAt: new Date(),
      updatedAt: new Date()
    }]).then(res => console.log(res)).catch(res => console.log(res));
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  }
};

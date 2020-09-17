'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('document_type', [{
      name: 'Справка',
      createdAt: new Date(),
      updatedAt: new Date()
    }]).then(res => console.log(res)).catch(res => console.log(res));
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('document_type', null, {});
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('clinic', [{
      name: 'АрхиМед',
      phone: '88005553535',
      email: 'archMed@gmail.com',
      address: 'Улица Пушкина, дом Колотушкина',
      createdAt: new Date(),
      updatedAt: new Date()
    }]).then(res => console.log(res)).catch(res => console.log(res));
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('clinic', null, {});
  }
};

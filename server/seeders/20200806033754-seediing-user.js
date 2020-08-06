'use strict';
const { hashPassword } = require('../helpers/hashPassword')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users', [
     {
       email : 'admin@mail.com',
       password: hashPassword('12345'),
       name : 'Admin Sm',
       role: 'admin',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      email : 'pengajar@mail.com',
      password: hashPassword('12345'),
      name : 'Bu Tuti',
      role: 'pengajar',
      createdAt: new Date(),
       updatedAt: new Date()
    },
    {
      email : 'murid1@mail.com',
      password: hashPassword('12345'),
      name : 'Angel',
      role: 'murid',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email : 'murid2@mail.com',
      password: hashPassword('12345'),
      name : 'Bono',
      role: 'murid',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    
   ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  }
};

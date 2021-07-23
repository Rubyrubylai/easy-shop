'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', 
      Array.from({ length: 20 }).map((item, index) => ({
        id: index+1,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.imageUrl(),
        description: faker.commerce.productDescription(),
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};

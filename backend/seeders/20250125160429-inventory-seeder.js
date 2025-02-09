"use strict";
const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const locations = await queryInterface.select(null, "Locations", {
      where: {},
      limit: 100,
      raw: true,
    });

    const locationIds = locations.map((location) => location.id);

    const total = 500000;
    const chunked = 1000;

    console.time("dro");

    for (let k = 1; k <= total / chunked; k++) {
      const inventory = [];

      for (let i = 1; i <= chunked; i++) {
        inventory.push({
          id: uuidv4(),
          name: faker.commerce.productName(),
          price: faker.commerce.price(),
          location_id: faker.helpers.arrayElement(locationIds),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      await queryInterface.bulkInsert("Inventories", inventory, {});
    }

    console.timeEnd("dro");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Inventories", null, {});
  },
};

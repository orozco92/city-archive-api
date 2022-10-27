'use strict';
const md5 = require('md5');
const { Roles } = require('../../app.consts');
const dummyjson = require('dummy-json');

const template = `
  {
    "email": "{{email}}",
    "phone": "{{phone}}",
    "ci": "{{int 10000000000 99999999999}}",
    "name": "{{firstName}}",
    "last_name": "{{lastName}}",
    "address": "{{int 1 100}} {{street}} {{city}}",
    "nationality": "{{country}}"
  }`;

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = [{
      username: 'test',
      password: md5('password'),
      role: Roles.PUBLIC_USER,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      username: 'test-researcher',
      password: md5('password'),
      role: Roles.RESEARCHER,
      created_at: new Date(),
      updated_at: new Date(),
    }
    ]

    data = data.map(item => {
      const result = dummyjson.parse(template);
      const dummy = JSON.parse(result);
      return Object.assign(item, dummy)
    })

    await queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        password: md5('password'),
        email: 'admin@cityarchive.com',
        role: Roles.ADMIN,
        created_at: new Date(),
        updated_at: new Date(),
      }, ...data
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ToDos',[{
      title: "Learn Express JS",
      description: "starting project using express",
      status:'1',
      due_date: new Date(),
      createdAt: new Date(),
      updatedAt : new Date()
    },
    {
      title: "Learn Sequelize",
      description: "create db and table using sequelize",
      status:'0',
      due_date: new Date(),
      createdAt: new Date(),
      updatedAt : new Date()
    }
  ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

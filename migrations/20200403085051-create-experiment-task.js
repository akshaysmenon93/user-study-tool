'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ExperimentTasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      experimentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Experiments',
          key: 'id'
        }
      },
      taskId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tasks',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      uniqueKeys: {
        unique_key_experimentId_and_taskId: {
          customIndex: true,
          fields: ['experimentId', 'taskId']
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ExperimentTasks');
  }
};
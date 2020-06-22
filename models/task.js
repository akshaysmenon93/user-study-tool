'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    link: DataTypes.STRING
  }, {});
  Task.associate = function(models) {
    Task.belongsToMany(models.Experiment, {through: 'ExperimentTasks', foreignKey: 'taskId', as: 'experiments'})
  };
  return Task;
};
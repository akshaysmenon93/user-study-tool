'use strict';
module.exports = (sequelize, DataTypes) => {
  const ExperimentTask = sequelize.define('ExperimentTask', {
    experimentId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER
  }, {
    indexes: [
      {
        unique: true,
        fields: ['experimentId', 'taskId']
      }
    ]
  });
  ExperimentTask.associate = function(models) {
    ExperimentTask.belongsTo(models.Experiment, {foreignKey: 'experimentId'})
    ExperimentTask.belongsTo(models.Task, {foreignKey: 'taskId'})
  };
  return ExperimentTask;
};
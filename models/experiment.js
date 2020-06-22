'use strict';
module.exports = (sequelize, DataTypes) => {
  const Experiment = sequelize.define('Experiment', {
    status: DataTypes.TINYINT,
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Experiment.associate = function(models) {
    Experiment.belongsToMany(models.Task, {through: 'ExperimentTasks', foreignKey: 'experimentId', as: 'tasks'})
    Experiment.belongsToMany(models.User, {through: 'ExperimentUsers', foreignKey: 'experimentId', as: 'users'})
  };

  Experiment.STATUS_DRAFT=0
  Experiment.STATUS_PUBLISHED=1

  return Experiment;
};
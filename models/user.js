'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.Experiment, {through: 'ExperimentUsers', foreignKey: 'userId', as: 'experiments'})
  };
  return User;
};
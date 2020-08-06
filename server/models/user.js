'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/hashPassword')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate( (instance, option) => {
    const hash = hashPassword(instance.password)
    instance.password = hash
  })
  return User;
};
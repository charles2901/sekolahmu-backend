'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Class.init({
    rows: DataTypes.INTEGER,
    columns: DataTypes.INTEGER,
    teacher: DataTypes.STRING,
    available_seats: DataTypes.ARRAY(DataTypes.STRING),
    occupied_seats: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Class',
  });
  return Class;
};
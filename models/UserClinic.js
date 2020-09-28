'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class UserClinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  UserClinic.init({
    user_id: DataTypes.INTEGER,
    clinic_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserClinic',
    tableName: 'user_document'
  });
  return UserClinic;
};
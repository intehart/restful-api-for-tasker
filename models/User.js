'use strict';
const { Model } = require('sequelize');
const { DocumentType } = require('DocumentType');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    constructor(values, options) {
      super(values, options);
      this.tableName = 'user';
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init({
    role: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    patronymic: DataTypes.STRING,
    auth_token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.hasMany(DocumentType, { foreignKey: 'id' });

  return User;
};
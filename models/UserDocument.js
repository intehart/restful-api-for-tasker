'use strict';
const { Model } = require('sequelize');
const { User } = require('User');

module.exports = (sequelize, DataTypes) => {
  class UserDocument extends Model {
    constructor(values, options) {
      super(values, options);
      this.tableName = 'user_document';
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

  UserDocument.init({
    user_id: DataTypes.INTEGER,
    document_type_id: DataTypes.INTEGER,
    file: DataTypes.STRING,
    clinic_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserDocument',
  });

  UserDocument.hasOne(User, { foreignKey: 'user_id' });

  return UserDocument;
};
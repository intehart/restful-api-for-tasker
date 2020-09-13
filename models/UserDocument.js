'use strict';
const { Model } = require('sequelize');
const { User } = require('./User');
const { DocumentType } = require('./DocumentType');
const { Clinic } = require('./Clinic');

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

    uploadDocument() {

    }
  }

  UserDocument.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
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
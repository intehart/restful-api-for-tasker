'use strict';
const { Model } = require('sequelize');
const { User } = require('./User');

module.exports = (sequelize, DataTypes) => {
  class DocumentType extends Model {
    constructor(values, options) {
      super(values, options);
      this.tableName = 'document_type';
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

  DocumentType.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'DocumentType',
  });

  return DocumentType;
};
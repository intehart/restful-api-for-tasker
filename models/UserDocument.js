'use strict';
const { Model, DataTypes } = require('sequelize');
const path = require('path');
const crypto = require('crypto');

module.exports = (sequelize) => {
  class UserDocument extends Model {

    constructor(values) {
      super(values);
      this.fileResource = values.fileResource;
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    generateNewFileName() {
      const time = new Date();

      const fileExtension = path.extname(this.fileResource.name);

      const hashName = crypto
        .createHash('md5')
        .update(`${this.fileResource.md5}${this.fileResource.name}${time.getTime()}${this.user_id}`)
        .digest('hex');

      const fileName = hashName + fileExtension;

      this.file = `${__root}/public/files/${time.getFullYear()}/${time.getMonth()}/${time.getDay()}/${fileName}`;

      return this;
    }

    uploadDocument() {
      return this.fileResource.mv(this.file);
    }
  }

  UserDocument.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    document_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    file: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clinic_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserDocument',
    tableName: 'user_document'
  });

  return UserDocument;
};
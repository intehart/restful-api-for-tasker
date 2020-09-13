'use strict';
const { Model, DataTypes } = require('sequelize');
// const { User } = require('./User')(db);

module.exports = (sequelize) => {
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
  });

  // UserDocument.hasOne(User, { foreignKey: 'user_id' });

  return UserDocument;
};
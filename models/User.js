'use strict';
const { Model } = require('sequelize');
const { UserDocument } = require('./UserDocument');

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
    role: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    patronymic: {
      type: DataTypes.STRING,
      allowNull: true
    },
    auth_token: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.hasMany(UserDocument, { foreignKey: 'id' });

  return User;
};
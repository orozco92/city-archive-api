'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Archive extends Model {
    static associate(models) {
      Archive.belongsTo(models.PublicFund, {
        onDelete: 'CASCADE'
      })
    }
  }
  Archive.init({
    path: DataTypes.STRING,
    mimeType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Archive',
    tableName: 'Archives',
    underscored: true,
  });
  return Archive;
};
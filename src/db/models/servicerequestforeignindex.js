'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceRequestForeignIndex extends Model {
    static associate(models) {
      ServiceRequestForeignIndex.belongsTo(models.ServiceRequest, {
        onDelete: 'CASCADE'
      })
    }
  }
  ServiceRequestForeignIndex.init({
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    nationality: DataTypes.STRING,
    informationOfInterest: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ServiceRequestForeignIndex',
    tableName: 'service_request_foreignIndexes',
    underscored: true,
  });
  return ServiceRequestForeignIndex;
};
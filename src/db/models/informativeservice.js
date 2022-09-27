'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InformativeService extends Model {
    static associate(models) {
      InformativeService.hasMany(models.ServiceRequest, {
        onDelete: 'CASCADE'
      })
    }
  }
  InformativeService.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    priceNative: DataTypes.DECIMAL,
    priceForeign: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'InformativeService',
    tableName: 'informative_services',
    underscored: true,
  });
  return InformativeService;
};
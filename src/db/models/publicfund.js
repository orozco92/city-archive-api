'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PublicFund extends Model {
    static associate(models) {
      PublicFund.hasMany(models.Archive, {
        onDelete: 'CASCADE'
      })
    }
  }
  PublicFund.init({
    catalogue: DataTypes.STRING,
    denomination: DataTypes.STRING,
    description: DataTypes.TEXT,
    date: DataTypes.DATEONLY,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PublicFund',
    tableName: 'public_funds',
    underscored: true,
  });
  return PublicFund;
};
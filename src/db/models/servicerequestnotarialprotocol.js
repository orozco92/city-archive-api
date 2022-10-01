'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceRequestNotarialProtocol extends Model {
    static associate(models) {
      ServiceRequestNotarialProtocol.belongsTo(models.ServiceRequest, {
        onDelete: 'CASCADE'
      })
    }
  }
  ServiceRequestNotarialProtocol.init({
    type: DataTypes.STRING,
    appearingOrInvolved: DataTypes.STRING,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    city: DataTypes.STRING,
    notary: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ServiceRequestNotarialProtocol',
    tableName: 'service_request_notarial_protocols',
    underscored: true,
  });
  return ServiceRequestNotarialProtocol;
};
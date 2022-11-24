'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceRequest extends Model {

    static associate(models) {
      ServiceRequest.belongsTo(models.User, {
        onDelete: 'CASCADE',
        as: 'RequestedBy'
      })
      ServiceRequest.belongsTo(models.InformativeService, {
        onDelete: 'CASCADE'
      })
      ServiceRequest.hasOne(models.ServiceRequestForeignIndex, {
        onDelete: 'CASCADE'
      })
      ServiceRequest.hasOne(models.ServiceRequestNotarialProtocol, {
        onDelete: 'CASCADE'
      })
    }

    static getSearchAttributes() {
      return ['ci', 'status']
    }

  }
  ServiceRequest.init({
    ci: {
      type: DataTypes.STRING,
      validate: {
        len: 11
      }
    },
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    address: DataTypes.TEXT,
    nationality: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'CREATED'
    },
  }, {
    sequelize,
    modelName: 'ServiceRequest',
    tableName: 'service_requests',
    underscored: true,
    defaultScope: {
      include: [{
        association: 'InformativeService',
        attributes: ['id', 'name']
      }, {
        association: 'ServiceRequestForeignIndex'
      }, {
        association: 'ServiceRequestNotarialProtocol'
      }]
    }
  });
  return ServiceRequest;
};
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      News.hasMany(models.Archive, {
        onDelete: "CASCADE",
      });
    }

    static getSearchAttributes() {
      return ["title"];
    }
  }
  News.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      endDate: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "News",
      tableName: "news",
      underscored: true,
      defaultScope: {
        include: {
          association: "Archives",
          order: [["created_at", "asc"]],
        },
      },
    }
  );
  return News;
};

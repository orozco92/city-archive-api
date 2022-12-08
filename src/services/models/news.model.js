const DefaultModelService = require("./default-model-service");
const db = require("../../db/models");

class ServiceRequestModel extends DefaultModelService {
  static name = "News";

  async upload(id, files) {
    let archives = files.map((item) => ({
      fileName: item.originalname,
      path: "/uploads/" + item.filename,
      mimeType: item.mimetype,
    }));
    const news = await this.find(id);
    archives = await db["Archive"].bulkCreate(archives);
    await news.addArchives(archives);
    return true;
  }

  async getActiveNews(query, opts) {
    query.where.endDate = { [db.Sequelize.Op.gte]: new Date() };
    return super.list(query, opts);
  }
}

module.exports = ServiceRequestModel;

const DefaultModelService = require("./default-model-service");
const db = require('../../db/models');
const fs = require('fs');

class ServiceRequestModel extends DefaultModelService {
    static name = 'PublicFund'

    async upload(id, files) {
        let archives = files.map(item => ({
            fileName: item.originalname,
            path: '/uploads/' + item.filename,
            mimeType: item.mimetype
        }))
        const fund = await this.find(id);
        archives = await db['Archive'].bulkCreate(archives);
        await fund.addArchives(archives);
        return true;
    }

    async deleteArchive(id) {
        const archive = await db['Archive'].findByPk(id);
        await archive.destroy();
        fs.unlinkSync('.' + archive.path)
    }
}

module.exports = ServiceRequestModel;

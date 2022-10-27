const DefaultModelService = require("./default-model-service");
const db = require('../../db/models')

class ProfileModel extends DefaultModelService {
    static name = 'Profile'
    userId;

    constructor(userId) {
        super('User')
        this.userId = userId;
    }

    async update(body) {
        return super.save(body, this.userId);
    }

    async getServiceRequests(query, opts) {
        let result = {}
        if (opts.pagination) {
            result = await db['ServiceRequest'].findAndCountAll(query)
            result['skip'] = query.offset
            result['limit'] = +query.limit
            result['pages'] = Math.ceil(result.count / result.limit)
        } else {
            delete query.limit
            delete query.offset
            delete query.skip
            result['rows'] = await db['ServiceRequest'].findAll(query)
        }
        return result
    }
}

module.exports = ProfileModel;

const DefaultModelService = require("./default-model-service");

class ServiceRequestModel extends DefaultModelService {
    static name = 'ServiceRequest'

    async save(body, id, opts) {
        body.date = new Date();
        body.UserId = opts.user
        return super.save(body, id, opts);
    }
}

module.exports = ServiceRequestModel;

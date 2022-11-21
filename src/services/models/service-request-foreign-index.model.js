const DefaultModelService = require("./default-model-service");
const ServiceRequestModel = require("./service-request.model");

class ServiceRequestForeignIndexModel extends DefaultModelService {
    static name = 'ServiceRequestForeignIndex'

    async save(body, id, opts) {
        const sr = new ServiceRequestModel('ServiceRequest');
        const request = await sr.save(body.ServiceRequest, body.serviceRequest?.id, opts);
        body.ServiceRequestId = request.id;
        super.save(body, id, opts);
    }
}

module.exports = ServiceRequestForeignIndexModel;

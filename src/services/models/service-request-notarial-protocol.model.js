const DefaultModelService = require("./default-model-service");
const ServiceRequestModel = require("./service-request.model");

class ServiceRequestNotarialProtocolModel extends DefaultModelService {
    static name = 'ServiceRequestNotarialProtocol'

    async save(body, id, opts) {
        const sr = new ServiceRequestModel('ServiceRequest');
        const request = await sr.save(body.ServiceRequest, body.serviceRequest?.id, opts);
        body.ServiceRequestId = request.id;
        return super.save(body, id, opts);
    }
}

module.exports = ServiceRequestNotarialProtocolModel;

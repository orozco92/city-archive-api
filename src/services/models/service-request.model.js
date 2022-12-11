const DefaultModelService = require("./default-model-service");

class ServiceRequestModel extends DefaultModelService {
  static name = "ServiceRequest";

  async save(body, id, opts) {
    if (!id || !body.date) {
      body.date = new Date();
    }
    body.RequestedById = opts.user.id;
    return super.save(body, id, opts);
  }
}

module.exports = ServiceRequestModel;

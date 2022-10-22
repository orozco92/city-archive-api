const { loadModules } = require("../utils/load-modules");
const DefaultModelService = require("./default-model-service");

const modules = loadModules(__dirname, { postfix: 'model.js' })

/**
 * 
 * @param {*} model 
 * @returns {DefaultModelService}
 */
function getServiceForModel(model) {
    const name = 'string' === typeof model ? model : model.name
    const ModelService = modules.find(item => item.name === name);
    if (ModelService != null) {
        return new ModelService(model)
    }
    return new DefaultModelService(model)
}

module.exports = {
    getServiceForModel
};

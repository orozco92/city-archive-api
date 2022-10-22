const db = require('../../db/models')
const Promise = require('bluebird')
const _ = require('lodash')

class DefaultModelService {

    model = null;

    constructor(model) {
        if ('string' === typeof model) {
            this.model = db[model];
        } else {
            this.model = model
        }
    }

    find(id, query) {
        const q = Object.assign({ attributes: { all: true } },
            query)
        return this.model.findByPk(id, q)
    }

    async list(query, opts) {
        let result = {}
        if (opts.pagination) {
            result = await this.model.findAndCountAll(query)
            result['skip'] = query.offset
            result['limit'] = +query.limit
            result['pages'] = Math.ceil(result.count / result.limit)
        } else {
            delete query.limit
            delete query.offset
            delete query.skip
            result['rows'] = await this.model.findAll(query)
        }
        return result
    }

    async remove(id, opts) {
        const data = await this.model.findByPk(id)
        if (!!data)
            return data.destroy()
        else
            return 'nothing to destroy'
    }

    async save(body, id, opts) {
        let instance, modelConfig
        delete body.id
        if (!id) {
            instance = await this.model.create(body)
            // modelConfig = modelMaps.create(model)
        } else {
            instance = await this.model.unscoped().findByPk(id)
            instance = await instance.update(body)
            // modelConfig = modelMaps.update(model)
        }
        const assoc = !!modelConfig &&
            await saveAssociation(instance, modelConfig, body)
        return !!assoc ? instance.reload() : instance
    }

    async saveAssociation(instance, modelConfig, body) {
        const keys = Object.keys(modelConfig)
        const associativeProps = _.pick(body, keys)
        if (!!Object.keys(associativeProps).length) {
            return Promise.mapSeries(Object.keys(associativeProps), item => {
                const config = modelConfig[item]
                let q
                if (config.type === 'object') {
                    if (!!associativeProps[item] && associativeProps[item].id) {
                        q = db[config.model].findByPk(associativeProps[item].id).then(data => {
                            return !!config.updateable
                                ? data.update(associativeProps[item])
                                : data
                        })
                    } else if (!associativeProps[item]) {
                        q = new Promise((resolve) => resolve(null))
                    } else {
                        q = db[config.model].create(associativeProps[item])
                    }
                } else if (config.type === 'array') {
                    let props = associativeProps[item]
                    q = Promise.map(props, it => {
                        return !!it && it.id
                            ? db[config.model].findByPk(it.id).then(data => {
                                return !!config.updateable ? data.update(it) : data
                            })
                            : db[config.model].create(it)
                    })
                } else
                    q = db[config.model].findByPk(associativeProps[item])
                return q.then(data => {
                    return instance[config.assocFunction](data)
                })
            })
        }
        return false
    }
}
module.exports = DefaultModelService
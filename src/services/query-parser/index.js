const db = require('../../db/models')
const modelMaps = require('../maps')
// const queryMaps = require('./maps.service')
const moment = require('moment')
const _ = require('lodash')
const Op = db.Sequelize.Op

module.exports = {

    buildModel: (model) => (req, res, next) => {
        let modelName = modelMaps.getModelFromRoute(req.params.model, req.method)
        let m = db[modelName]
        // const scope = req.query.scope

        // if (scope == null)
        //     m = m.unscoped()
        // else {
        //     try {
        //         m = m.scope(scope)
        //     } catch (e) {
        //         console.error(e)
        //         log.error(e)
        //     }
        // }
        req.Model = m
        next()
    },

    /**
     * Middleware query parser that takes a model name and returns the
     * model specific query filter if there is one.
     * @param model
     * @returns {function(*=, *=, *=): (*|undefined)}
     */
    model: (model) => (req, res, next) => {
        const modelName = model ||
            modelMaps.route(req.params.model, req.method)
        if (!modelName)
            return next()
        req.modelName = modelName
        const queryFilter = queryMaps.queryFilter(modelName)
        if (!!queryFilter) {
            return queryFilter(req, res, next)
        }
        next()
    },
    /**
     * Middleware query parser that verifies if there is a req.query.search
     * object and transforms its data in a valid Sequelize 'where' clause;
     * which checks, via 'ilike' sql function, the value of 'search' against
     * the given model's search attributes. Then, it assigns the created Sequelize
     * 'where' clause to the req.query.where object.
     * @param model
     * @returns {function(*, *, *): (*|undefined)}
     */
    search: (model) => (req, res, next) => {
        let where = req.query.where || {}
        const search = req.query.search
        const Model = model ?? req.Model
        if (!Model)
            return next()

        if (!!search && !!Model.getSearchAttributes) {
            if (!where[Op.or]) {
                where[Op.or] = []
            }
            const searchAttributes = Model.getSearchAttributes()
            searchAttributes.forEach(item => {
                where[Op.or].push({ [item]: { [Op.like]: `%${search}%` } })
            })
        }

        req.query.where = where
        next()
    },
    /**
     * Middleware query parser that checks every item in the req.query
     * object and verifies that it belongs to the given model's list of raw attributes.
     * Then, it process each item that passes the verification according to its type and adds them to a valid
     * Sequelize 'where' object. Finally it assigns the created Sequelize 'where' object
     * to the req.query.were object.
     * @param model
     * @returns {function(*, *, *): (*|undefined)}
     */
    where: (model) => {
        return (req, res, next) => {
            const Model = model ?? req.Model
            if (!Model)
                return next()
            const where = req.query.where || {}
            _.forEach(Model.rawAttributes, item => {
                if (req.query.hasOwnProperty(item.fieldName)) {
                    let val
                    switch (item.type.key) {
                        case 'INTEGER':
                        case 'DECIMAL':
                        case 'DOUBLE':
                        case 'FLOAT':
                            const value = req.query[item.fieldName].split(',') || []
                            val = (value.length === 1 && (dataTypes.isNullValue(value[0]) || value[0].trim().toLowerCase() === 'undefined')) ? null : value
                            break
                        case 'DATE':
                        case 'DATEONLY':
                            const values = req.query[item.fieldName].split(',') || []
                            if (values.length > 1) {
                                val = values.map(it => dataTypes.isNullValue(it) ? null : moment(it))
                            } else {
                                val = dataTypes.isNullValue(values[0]) ? null : moment(values[0])
                            }
                            break
                        case 'BOOLEAN':
                            val = req.query[item.fieldName]
                            break
                        default:
                            val = req.query[item.fieldName].split(',') || []
                            break
                    }
                    where[item.fieldName] = val
                }
            })
            req.query.where = where
            next()
        }
    },
    /**
     * Middleware query parser that takes a model and adds a valid
     * Sequelize 'include' clause to req.query based on the given
     * model's include mappings on maps.service.
     * @param model
     * @returns {function(*, *, *): (*|undefined)}
     */
    include: (model) => (req, res, next) => {
        const modelName = model ||
            modelMaps.route(req.method, req.params.model)
        if (!modelName)
            return next()
        if (req.query.include && req.query.include.toUpperCase() === 'ALL')
            req.query.include = modelMaps.include(modelName)
        else if (!!req.query.include) {
            let include = req.query.include.split(',').map(item => item.trim())
            const inc = modelMaps.include(modelName) || []
            req.query.include = inc.filter(item => {
                return !!include.find(it => it === item.association)
            })
        }
        next()
    },
    /**
     * Middleware query parser that checks if there is a req.query.attributes object (csv)
     * and formats it to a valid Sequelize query array of attributes.
     * @returns {function(*, *, *): void}
     */
    attributes: () => (req, res, next) => {
        let attributes = !!req.query.attributes
            ? req.query.attributes.split(',')
            : []
        let attrib = []
        if (!!attributes.length) {
            for (let i = 0; i < attributes.length; i++) {
                const currentAttribute = attributes[i].split('.') || []
                if (currentAttribute.length > 1) {
                    const assocArray = currentAttribute.slice(0,
                        currentAttribute.length - 1)
                    let include = req.query.include || []
                    let a
                    for (let i = 0; i < assocArray.length; i++) {
                        a = include.find(item => item.association === assocArray[i])
                        if (!!a && a.include)
                            include = a.include
                    }
                    if (!a)
                        continue
                    if (!a.attributes)
                        a.attributes = []
                    a.attributes.push(currentAttribute[currentAttribute.length - 1])
                } else {
                    attrib.push(currentAttribute[0])
                }
            }
            req.query.attributes = attrib
        }
        next()
    },
    /**
     * Middleware query parser that makes a sequelize order object<br>
     *   The url query <code>?date:desc,order=name:asc</code>
     *   will be converted to a sequelize order object
     *   @example
     *   ```js
     *   [
     *      [db.Sequelize.col('date'), 'DESC'],
     *      [db.Sequelize.col('name'), 'ASC']
     *   ]
     *   ```
     * @returns {function(...[*]=)}
     */
    order: (model) => (req, res, next) => {
        const Model = model ?? req.Model
        const rawAttributesKeys = Object.keys(Model.rawAttributes)
        const isAttrCreatedAt = rawAttributesKeys.findIndex(attr => attr === 'createdAt') > -1
        const queryAttrCreatedAt = !!req.query.attributes
            ? req.query.attributes.split(',').find(it => it === 'createdAt')
            : null
        let order = [
            [
                db.Sequelize.col(isAttrCreatedAt ? 'createdAt' : 'id'), 'DESC',
            ]]
        const rawOrder = req.query.order || ''
        if (!!rawOrder) {
            order = rawOrder.split(',').map(row => {
                const items = row.split(':')
                return [
                    db.Sequelize.col(items[0]),
                    items[1],
                ]
            })
        } else if (isAttrCreatedAt && !queryAttrCreatedAt && !!req.query.attributes) {
            req.query.attributes += ',createdAt'
        }
        req.query.order = order
        next()
    },
    /**
     * Middleware query parser that checks for a req.query.not
     * and appends it to req.query.where
     * The url query <code>?not[id]=15,210,209</code>
     * @returns {function(*, *, *): void}
     */
    not: () => (req, res, next) => {
        if (!req.query.not)
            return next()
        const not = {}
        _.forEach(req.query.not, (v, k) => {
            const value = v.split(',') || []
            not[k] = value.length === 1 && value[0].trim().toLowerCase() === 'null' ? null : value
        })
        req.query.not = not
        next()
    },
    /**
     * Middleware query parser that builds a valid Sequelize query based on the
     * properties in the req.query object and adds it as a req.Query object.
     * @returns {function(*, *, *): void}
     */
    queryBuilder: () => (req, res, next) => {
        const where = req.query.where || {}
        const include = req.query.include
        let skip = req.query.skip || 0
        const limit = req.query.limit || 10
        const attributes = req.query.attributes
        const not = req.query.not
        const page = +req.query.page
        if (!!page)
            skip = limit * (page - 1)
        const query = {
            offset: skip,
            limit: limit,
        }
        if (!!where)
            query.where = where
        if (!!req.query.order)
            query.order = req.query.order
        if (!!include) {
            query.distinct = true
            query.include = include
        }
        if (!!attributes) {
            query.attributes = attributes
        }
        if (!!not) {
            where[Op.not] = not
        }
        if (typeof req.query.subQuery !== 'undefined') {
            query.subQuery = !!+req.query.subQuery
        }
        req.Query = query
        next()
    },
}
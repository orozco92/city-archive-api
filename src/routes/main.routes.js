const express = require('express');
const router = express.Router();
const queryParser = require('../services/query-parser');
const modelService = require('../services/models');

router.get('/',
  queryParser.order(),
  // queryParser.include(),
  queryParser.attributes(),
  queryParser.where(),
  queryParser.not(),
  queryParser.search(),
  // queryParser.model(),
  queryParser.queryBuilder(),
  async function (req, res, next) {
    const query = req.Query
    const model = req.Model
    try {
      const data = await modelService.getServiceForModel(model).list(query, {
        scope: req.query.scope,
        pagination: !req.query.noPaged
      })
      res.send(data)
    } catch (e) {
      next(e)
    }
  })

router.get('/:id',
  queryParser.order(),
  // queryParser.include(),
  queryParser.attributes(),
  queryParser.queryBuilder(),
  async function (req, res, next) {
    const id = req.params.id
    const query = req.Query
    delete query.limit
    delete query.offset
    try {
      const data = await modelService.getServiceForModel(req.Model).find(id, query, { scope: req.query.scope })
      res.send(data)
    } catch (e) {
      next(e)
    }
  })

router.post('/',
  async function (req, res, next) {
    try {
      let instance = await modelService.getServiceForModel(req.Model).save(req.body, null, { user: req.user, entity: req.entity })
      res.send({ data: instance })
    } catch (e) {
      next(e)
    }
  })

router.put('/:id',
  async function (req, res, next) {
    const id = req.params.id
    if (!id)
      return next(new Error('Bad model ID'))
    try {
      let instance = await modelService.getServiceForModel(req.Model).save(req.body, id, { user: req.user, entity: req.entity })
      res.send({ data: instance })
    } catch (e) {
      next(e)
    }
  })

router.delete('/:id',
  async function (req, res, next) {
    const id = req.params.id
    if (!id)
      return next(new Error('Bad model ID'))
    try {
      const data = await modelService.getServiceForModel(req.Model).delete(id, req.query)
      res.send({ data: data })
    } catch (e) {
      next(e)
    }
  })
module.exports = {
  path: '/:model',
  order: 2,
  router,
  middlewares: [queryParser.buildModel()]
};

const express = require('express');
const router = express.Router();
const queryParser = require('../services/query-parser');
const modelService = require('../services/models');
const passport = require('passport');
const multer = require('multer')
const upload = multer({ dest: './uploads/' })

router.put('/:publicFundId',
  upload.array('files'),
  async function (req, res, next) {
    try {
      await modelService.getServiceForModel('PublicFund').upload(req.params.publicFundId, req.files)
      res.status(204).end();
    } catch (e) {
      next(e)
    }
  })

router.delete('/:id',
  async function (req, res, next) {
    try {
      await modelService.getServiceForModel('PublicFund').deleteArchive(req.params.id)
      res.status(204).end();
    } catch (e) {
      next(e)
    }
  })

module.exports = {
  path: '/archives',
  order: 3,
  router,
  middlewares: [
    passport.authenticate('jwt', { failWithError: true }),
    queryParser.buildModel()]
};

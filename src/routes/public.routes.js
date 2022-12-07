const express = require("express");
const router = express.Router();
const queryParser = require("../services/query-parser");
const modelService = require("../services/models");
const publicModels = "(informative-services|public-funds)";

router.get("/download/:id/:archiveId", async function (req, res, next) {
  try {
    const data = await modelService
      .getServiceForModel("PublicFund")
      .find(req.params.id, {
        includes: "Archives",
      });
    const archive = data.Archives.find(
      (item) => item.id == req.params.archiveId
    );
    res.download("./" + archive.path, archive.fileName);
  } catch (e) {
    next(e);
  }
});

router.get(
  "/",
  queryParser.order(),
  // queryParser.include(),
  queryParser.attributes(),
  queryParser.where(),
  queryParser.not(),
  queryParser.search(),
  // queryParser.model(),
  queryParser.queryBuilder(),
  async function (req, res, next) {
    const query = req.Query;
    const model = req.Model;
    try {
      const data = await modelService.getServiceForModel(model).list(query, {
        scope: req.query.scope,
        pagination: !req.query.noPaged,
      });
      res.send(data);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/:id",
  queryParser.order(),
  // queryParser.include(),
  queryParser.attributes(),
  queryParser.queryBuilder(),
  async function (req, res, next) {
    const id = req.params.id;
    const query = req.Query;
    delete query.limit;
    delete query.offset;
    try {
      const data = await modelService
        .getServiceForModel(req.Model)
        .find(id, query, { scope: req.query.scope });
      res.send(data);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = {
  path: "/public/:model" + publicModels,
  order: 2,
  router,
  middlewares: [queryParser.buildModel()],
};

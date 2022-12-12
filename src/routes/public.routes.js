const express = require("express");
const router = express.Router();
const queryParser = require("../services/query-parser");
const modelService = require("../services/models");
const publicModels = "(informative-services|public-funds|news)";

router.get("/welcome", function (req, res, next) {
  res.send("Welcome to City Archive API");
});

router.get(
  "/:model" + publicModels + "/download/:id/:archiveId",
  queryParser.buildModel(),
  async function (req, res, next) {
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
  }
);

router.get(
  "/news",
  queryParser.buildModel("News"),
  queryParser.order(),
  queryParser.attributes(),
  queryParser.where(),
  queryParser.not(),
  queryParser.search(),
  queryParser.queryBuilder(),
  async function (req, res, next) {
    const query = req.Query;
    const model = req.Model;
    try {
      const data = await modelService
        .getServiceForModel(model)
        .getActiveNews(query, {
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
  "/:model" + publicModels,
  queryParser.buildModel(),
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
  "/:model" + publicModels + "/:id",
  queryParser.buildModel(),
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
  path: "/public",
  order: 2,
  router,
  middlewares: [],
};

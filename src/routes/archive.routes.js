const express = require("express");
const router = express.Router();
const queryParser = require("../services/query-parser");
const modelService = require("../services/models");
const passport = require("passport");
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
const fs = require("fs");

router.put(
  "/:type/:publicFundId",
  upload.array("files"),
  async function (req, res, next) {
    let model = "";
    switch (req.params.type) {
      case "news":
        model = "News";
        break;
      case "public-funds":
        model = "PublicFund";
        break;
      default:
        model = "News";
        break;
    }
    try {
      await modelService
        .getServiceForModel(model)
        .upload(req.params.publicFundId, req.files);
      res.status(204).end();
    } catch (e) {
      next(e);
    }
  }
);

router.delete("/:id", async function (req, res, next) {
  try {
    const archive = await modelService
      .getServiceForModel("Archive")
      .remove(req.params.id);
    fs.unlinkSync("." + archive.path);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

module.exports = {
  path: "/archives",
  order: 3,
  router,
  middlewares: [
    passport.authenticate("jwt", { failWithError: true }),
    queryParser.buildModel(),
  ],
};

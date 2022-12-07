const express = require("express");
const router = express.Router();
const passport = require("passport");
const tokenProvider = require("../services/security/token-provider");
const modelService = require("../services/models");
const { Roles } = require("../app.consts");
const md5 = require("md5");

router.post(
  "/login",
  passport.authenticate("local", { failureMessage: true }),
  tokenProvider
);

router.post("/signup", async function (req, res, next) {
  const service = modelService.getServiceForModel("User");
  let user = await service.list(
    {
      where: {
        username: req.body.username,
        password: req.body.password,
      },
    },
    { pagination: false }
  );

  if (user.rows.length) {
    return next(new Error("El usuario ya existe"));
  }
  await service.save({
    username: req.body.username,
    password: md5(req.body.password),
    email: req.body.email,
    role: Roles.PUBLIC_USER,
  });
  res.end();
});

module.exports = {
  path: "/auth",
  order: 1,
  router,
  middlewares: [],
};

const express = require('express');
const router = express.Router();
const passport = require('passport');
const tokenProvider = require('../services/security/token-provider');

router.post('/login/',
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
    tokenProvider,
);

module.exports = {
    path: '/auth',
    order: 1,
    router,
    middlewares: []
};

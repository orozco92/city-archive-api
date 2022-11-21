const express = require('express');
const router = express.Router();
const ProfileModel = require('../services/models/profile.model');
const queryParser = require('../services/query-parser');
const db = require('../db/models');
const passport = require('passport');

router.put('',
    async (req, res, next) => {
        try {
            const user = await req.modelService.update(req.body);
            res.send(user)
        } catch (error) {
            next(error);
        }
    },
);

router.get('/my-services',
    queryParser.order(db['ServiceRequest']),
    queryParser.attributes(),
    queryParser.where(db['ServiceRequest']),
    queryParser.not(),
    queryParser.search(db['ServiceRequest']),
    queryParser.queryBuilder(),
    async (req, res, next) => {
        try {
            console.log(req.Model);
            req.Query.include = {
                association: 'InformativeService',
                attributes: ['id', 'name', 'price', 'url']
            }
            const data = await req.modelService.getServiceRequests(req.Query, {
                scope: req.query.scope,
                pagination: !req.query.noPaged
            })
            res.send(data)
        } catch (error) {
            next(error);
        }
    },
);

module.exports = {
    path: '/profile',
    order: 1,
    router,
    middlewares: [
        passport.authenticate('jwt', { failWithError: true }),
        (req, res, next) => {
            req.modelService = new ProfileModel(req.user.id);
            next();
        }
    ]
};

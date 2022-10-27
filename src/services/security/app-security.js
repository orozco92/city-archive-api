var passport = require('passport');
var LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../../db/models');
const Op = db.Sequelize.Op;
const md5 = require('md5');
const session = require('express-session');
const config = require('../../config');

const localStrategy = new LocalStrategy(async function (username, password, done) {
    try {
        const user = await db.User.findOne({
            where: {
                [Op.or]: {
                    email: username,
                    username: username
                },
                password: md5(password)
            }
        })
        if (user) done(null, user.toJSON())
    } catch (error) {
        console.log('Error fetching user')
        done(new Error('Incorrect username or password.'), false)
    }
})

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secret;

const jwtStrategy = new JwtStrategy(opts,
    async function (jwt_payload, done) {
        try {
            const user = await db.User.findByPk(jwt_payload.id)
            if (user) {
                done(null, user.toJSON())
            } else {
                done(null, false, { message: 'INVALID TOKEN' })
            }
        } catch (error) {
            console.log(error)
            console.log('Error fetching user')
            done(new Error('nvalid token'), false)
        }
    }
);

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

passport.use(localStrategy);
passport.use(jwtStrategy);

/**
 * 
 * @param {Express} app 
 */
function init(app) {
    app.use(passport.initialize());
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true }
    }));
}

module.exports = {
    init
};
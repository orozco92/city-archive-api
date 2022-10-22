var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
const db = require('../../db/models');
const Op = db.Sequelize.Op;
const md5 = require('md5');
const session = require('express-session');

const localStrategy = new LocalStrategy(async function verify(username, password, done) {
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

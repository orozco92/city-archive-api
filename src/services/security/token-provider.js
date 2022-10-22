const jwt = require('jsonwebtoken');
const _ = require('lodash');
module.exports = (req, res, next) => {
    const user = _.pick(req.user, ['id', 'username', 'role', 'email', 'ci', 'name', 'lastName', 'email', 'phone', 'address', 'nationality'])
    const token = jwt.sign(user, req._config.secret, {
        expiresIn: '1h'
    })
    res.send({
        user: user,
        token: token
    })
}
const _ = require('lodash');
const config = require('../config/');
const moduleLoader = require('../services/utils/load-modules');
let routes = moduleLoader.loadModules(__dirname, {
  postfix: '.routes.js'
});

/**
 * 
 * @param {Express} app 
 */
function init(app) {

  /**
   * Header config
   */
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers',
      'Content-Type, Content-Length, Authorization, Accept, X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Max-Age', '86400')
    if (req.method === 'OPTIONS') {
      res.sendStatus(200)
    } else {
      req._config = config
      next()
    }
  })

  /**
   * Load app routes
   */
  routes = _.orderBy(routes, ['order'])
  const routeConsole = []
  for (let routeConfig of routes) {
    if (!!routeConfig.middlewares)
      app.use(routeConfig.path, ...routeConfig.middlewares,
        routeConfig.router)
    else
      app.use(routeConfig.path, routeConfig.router)
    routeConsole.push(routeConfig)
  }
  console.table(routeConsole, ['order', 'path',])

  /**
   * Not found route
   */
  app.use(function (req, res, next) {
    res.sendStatus(404)
  })

  /**
   * Error route
   */
  app.use(async function (err, req, res, next) {
    if (res.statusCode < 400) {
      if (err.statusCode < 400 && err.statusCode >= 400)
        res.status(err.statusCode)
      else
        res.status(500)
    }
    const error = {
      status: res.statusCode,
      message: err.message,
    }

    if (req.app.get('env') === 'development') {
      console.log(err)
      error.stack = err.stack
    } else if (!(err instanceof HttpError)) {
      error.message = `¡Ups! Se produjo un error, cuéntenos que estaba haciendo para poder resolver el problema :)`
      log.error(err.message)
      log.error(err.stack)
    }
    res.send(error)
  })
}

module.exports = { init };

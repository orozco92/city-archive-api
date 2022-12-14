const routeMap = {
    users: {
        modelName: 'User',
        methods: ['ALL']
    },
    'informative-services': {
        modelName: 'InformativeService',
        methods: ['ALL']
    },
    'service-requests': {
        modelName: 'ServiceRequest',
        methods: ['ALL']
    }
}


function getModelFromRoute(route, method) {
    if (routeMap.hasOwnProperty(route) && (routeMap[route].methods[0] === 'ALL' || routeMap[route].methods.includes(method.toUpperCase())))
        return routeMap[route].modelName
    return null;
}

module.exports = {
    getModelFromRoute
}
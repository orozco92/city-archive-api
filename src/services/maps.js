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
    },
    'service-request-foreign-indices': {
        modelName: 'ServiceRequestForeignIndex',
        methods: ['ALL']
    },
    'service-request-notarial-protocols': {
        modelName: 'ServiceRequestNotarialProtocol',
        methods: ['ALL']
    },
    'public-funds': {
        modelName: 'PublicFund',
        methods: ['ALL']
    },
}

function getModelFromRoute(route, method) {
    if (routeMap.hasOwnProperty(route) && (routeMap[route].methods[0] === 'ALL' || routeMap[route].methods.includes(method.toUpperCase())))
        return routeMap[route].modelName
    return null;
}

module.exports = {
    getModelFromRoute
}
const express = require('express');
const router = express.Router();
const exchangeRoute = require('./exchange.Route')

const routerIndex = [
    {
        path: '/exchange',
        route: exchangeRoute
    }
]

routerIndex.forEach((item) => router.use(item.path, item.route));




module.exports = router;
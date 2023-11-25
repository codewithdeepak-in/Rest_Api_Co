const express = require('express');
const exchangeRoute = express.Router();
const fetchAndInsertIcon = require('../exchange_icon_data.js/icon');
const fetchAndStoreExchanges = require('../exchange_icon_data.js/exchange');
const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apierror'); // Ensure ApiError is correctly imported
const Exchange = require('../models/Exchange')
// Route for updating the data.

exchangeRoute.get('/update', async (req, res, next) => {
    try {
        await fetchAndStoreExchanges();
        await fetchAndInsertIcon();
        console.log('working')
        res.send('Exchanges fetched and stored successfully!');
    } catch (error) {
        next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `There is some error: ${error.message}`));
    }
});


exchangeRoute.get('/search', async (req, res, next) => {
    try {
        const searchTerm = req.query.term; 
        const regex = new RegExp(searchTerm, 'i');// case insensitive.
        const page = parseInt(req.query.page) || 1; // convert it into number.
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit; 

        let query = {};

        if (searchTerm) {
            query = { name: regex };
        }

        const results = await Exchange.find(query)
            .skip(skip)
            .limit(limit);

        const totalCount = await Exchange.countDocuments(query); // Get the total count of matching documents
        res.json({ results, totalCount });

    } catch (error) {
        next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `There is some error: ${error.message}`));
    }
});


module.exports = exchangeRoute;

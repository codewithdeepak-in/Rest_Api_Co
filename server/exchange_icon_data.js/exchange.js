const Exchange = require('../models/Exchange');
const axios = require('axios');

const fetchAndStoreExchanges = async () => {
    try {
        const apiKey = 'FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9';
        const response = await axios.get('https://rest.coinapi.io/v1/exchanges', {
            headers: {
                'X-CoinAPI-Key': apiKey,
            },
        });

        const exchangesData = response.data; // Assuming response.data is an array

        // Get existing exchange_ids from the database
        const existingExchangeIds = await Exchange.find({}, { exchange_id: 1 });

        // Extract exchange_ids from the fetched data
        const fetchedExchangeIds = exchangesData.map((exchange) => exchange.exchange_id);

        // Filter out exchanges that already exist in the database
        const newExchanges = exchangesData.filter(
            (exchange) => !existingExchangeIds.find((existing) => existing.exchange_id === exchange.exchange_id)
        );

        // Insert only the new exchanges into the database
        await Exchange.insertMany(newExchanges);

        console.log('Exchanges fetched and stored successfully!');
    } catch (error) {
        console.error('Error fetching or saving exchanges data:', error.message);
    }
};

module.exports = fetchAndStoreExchanges;

const Exchange = require('../models/Exchange');
const axios = require('axios');

const fetchAndInsertIcon = async () => {
    try {
        const apiKey = 'FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9';
        const response = await axios.get('https://rest.coinapi.io/v1/exchanges/icons/32', {
            headers: {
                'X-CoinAPI-Key': apiKey,
            },
        });
        const exchangesIconData = response.data;

        // Update the database with icon URLs
        exchangesIconData.forEach(async (exchangeIcon) => {
            const { exchange_id, url } = exchangeIcon;

            // Find and update the exchange by exchange_id
            await Exchange.findOneAndUpdate(
                { exchange_id: exchange_id },
                { $set: { url } },
                { upsert: true } // If the exchange doesn't exist, create it
            );
        });
    } catch (error) {
        console.error('Error fetching or saving exchanges data:', error.message);
    }
};

module.exports = fetchAndInsertIcon;

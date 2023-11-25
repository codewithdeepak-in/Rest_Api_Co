// models/Exchange.js
const mongoose = require('mongoose');

const exchangeSchema = new mongoose.Schema({
    name: String,
    exchange_id: String,
    volume_1day_usd: String,
    url: String
    // Add other exchange properties as needed
});

module.exports = mongoose.model('Exchange', exchangeSchema);

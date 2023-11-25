// models/Exchange.js
const mongoose = require('mongoose');

const exchangeSchema = new mongoose.Schema({
    name: String,
    exchange_id: String,
    url: String
    // Add other exchange properties as needed
});

module.exports = mongoose.model('Icon', exchangeSchema);

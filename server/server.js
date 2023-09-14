
const mongoose = require('mongoose')
const bodyParse = require('body-parser');
const express = require('express');
const app = express();
const mongouri = "mongodb://localhost:27017/";



const port = process.env.PORT /* This will work on server. */ || 3001;

app.listen(port, () => {
    console.log("Server running on port 3001");
})
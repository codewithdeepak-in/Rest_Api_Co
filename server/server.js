const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());





// Connection to Database.
mongoose.connect("mongodb://127.0.0.1:27017/")
.then(() => console.log('Connected To Database.'))
.catch(error => console.log(error));





const port = process.env.PORT || 3001;
app.listen(port, ()=> {
    console.log("Server is Working at " + port)
})
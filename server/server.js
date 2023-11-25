const {handleError, ApiError} = require('./middleware/apierror');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes');
const cors = require('cors');

app.use(cors());
// Fetch and store data function


app.use('/api', routes);


app.use((err, req, res, next) => {
    handleError(err, res); // Handle the error using your custom error handler
});

// Connection to database.
(async () => {
    try {
        const uri =
            'mongodb+srv://bagpacker3778:CidtzWrxHDGshAdC@cluster0.wueyulq.mongodb.net/?retryWrites=true&w=majority';
        const connection = await mongoose.connect(uri);
        if (connection) {
            console.log('Connected to Database Successfully');
        }
    } catch (error) {
        console.log('There is some error' + error.message);
    }
})();

// Server listening.
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('Server is responding at ' + port);
});

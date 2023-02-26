const express = require('express')
const bodyParser = require('body-parser');

//Set up Express
const app = express();

app.use(bodyParser.json());

//Initialize routes
app.use('/api', require('./routes/api'));

//Listen for requests
app.listen(process.env.port, () => {
    console.log(`Listening on http://localhost:${process.env.port}`);
});
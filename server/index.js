const express = require('express')
const bodyParser = require('body-parser');

//Set up Express
const app = express();

app.use(bodyParser.json());

//Initialize routes
app.use('/api', require('./routes/api'));

//Listen for requests
const port = process.env.port;
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
const express = require('express')
const bodyParser = require('body-parser');

//Set up Express
const app = express();

app.use(bodyParser.json());

//Initialize routes
app.use('/api', require('./routes/api'));

//Listen for requests
const port = 4000;
app.listen(process.env.port || port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

//Set up Express
const app = express();

app.use(bodyParser.json());
app.use(cors());

//Initialize routes
app.use('/api', require('./routes/api'));

//Listen for requests
app.listen(process.env.port, () => {
    console.log(`Listening on http://localhost:${process.env.port}`);
});
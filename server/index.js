const express = require('express');

//Set up Express
const app = express();

//Listen for requests
const port = 4000;
app.listen(process.env.port || port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
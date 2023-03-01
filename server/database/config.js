const path = require('path');

require('dotenv').config({
   path: path.resolve(__dirname, '../../.env')
});

const dbConfig = {
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
};
module.exports = dbConfig;

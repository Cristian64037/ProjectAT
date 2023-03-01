const config = require('../database/config');
const sql = require("mysql");

const connect = sql.createConnection(config);
connect.connect((err) => {
    if (!err) {
        console.log("Connection Successful ...");
    } else {
        console.log("Connection Error ...");
        console.log('======================');
        console.log(err);
    }
});
module.exports = connect;
const request = (sql, fields, connection) => {
    const promise =  new Promise((resolve, reject) => {
        connection.query(
            sql, fields , function (err, result) {
                if (!err) {
                    console.log(`Query Successful: ${sql} ...`);
                    resolve(result);
                } else {
                    console.log(`Query Error: ${sql} ...`);
                    console.log("===============");
                    console.log(err);
                    reject(err.sqlMessage);
                }
            });
    });
    return promise;
}
module.exports = {request}
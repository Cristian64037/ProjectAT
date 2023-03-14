const addLogin = (req, res, connection) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `Insert into LogIn(UserName, PSWD, RecoverEmail) values(?,?,?)`, [
                req.body.username,
                req.body.password,
                req.body.recover
            ], function (err, result) {
                if (!err) {
                    console.log("Post Successful: /login ...");
                    resolve(result);
                } else {
                    console.log(`Post Error: /login ...`);
                    console.log("===============");
                    console.log(err);
                }
            });
    });
}
module.exports = {addLogin}
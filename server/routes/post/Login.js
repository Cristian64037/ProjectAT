const bcrypts = require("bcrypt");

const postLogin = async (req, res, connection) => {
    let insertId="";
    const sql = `Insert into LogIn(UserName, PSWD, RecoverEmail) values(?,?,?)`;
    let hashedPassword =  await bcrypts.hash(req.body.password, 8);

    const fields = [
        req.body.username,
        hashedPassword,
        req.body.email
    ];

    const sql2 = `Insert into User(LogInId, FName, LName, Email) values(?,?,?,?)`;

    const checkIfUserNameExists=`Select * from LogIn where UserName=?`;
    const userName=req.body.username

    require("../queryDB").request(checkIfUserNameExists, userName, connection)
        .then(
            (data) => {
                if(data.length>0){
                    res.status(400).send("User Name Exists");
                }else {
                    require("../queryDB").request(sql, fields, connection)
                        .then(
                            (data) => {

                                insertId=data.insertId;
                                const fields2 = [
                                    data.insertId,
                                    req.body.firstName,
                                    req.body.lastName,
                                    req.body.email
                                ];

                                require("../queryDB").request(sql2, fields2, connection)
                                    .then(
                                        (data) => {
                                            res.status(201).send("Account Created Successfully");
                                        },
                                        (err) => {
                                            res.status(400).send(err);
                                        }
                                    );

                            },
                            (err) => {
                                res.status(400).send(err);
                            }
                        );
                }
            },
            (err) => {
                res.status(400).send(err);
            }
        );
}
module.exports = {postLogin};
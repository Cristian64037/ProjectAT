const bcrypts = require("bcrypt");
const jwt = require("jsonwebtoken");

const authenticate = (req, res, connection) => {
    const findUser = `Select PSWD,LogInId from LogIn where UserName=?`;
    const fields = [
        req.body.User,
        req.body.Pass
    ];

    require("../queryDB").request(findUser, fields[0], connection)
        .then(
            (data) => {
                if(data.length === 0){
                    res.status(400).json({
                        auth: false,
                        message: "User does not exist"
                    });
                }else bcrypts.compare(fields[1], data[0].PSWD, function (err, result) {

                    if (result === true) {

                        const id = data[0].LogInID;

                        const token = jwt.sign({sub:data[0].LogInId}, process.env.token, {
                            expiresIn: 1000
                        });
                        res.status(200).json({
                            auth: true,
                            token: token,
                            result: data
                        });
                    } else {
                        res.status(400).json({
                            auth: false,
                            message: "Incorrect Password"
                        });
                    }
                })
            }, (err) => {
                res.status(400).send(err);
            }
        );
}
module.exports = {authenticate};
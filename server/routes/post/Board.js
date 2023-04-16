const postBoard = (req, res, connection) => {
    let date_ob = new Date();
    const fields = [
        req.logId
    ];
    console.log(req.body)
    const getUserIDSQL=`Select UserID from User where LogInId=?`;
    const sql=`Insert into JobBoards(CreateDate,LastUpdated,BoardName,UserID) value(?,?,?,?)`;
    const UpdateUserSQl=`Update User Set CurrentBoard=? where LogInID=?`;
    console.log("================PATH========================");

    require("../queryDB").request(getUserIDSQL, fields[0], connection)
        .then(
            ( data) => {
                //console.log(data[0].UserID);
                fields.push(data[0].UserID);

                const Inserfields=[
                    date_ob,
                    date_ob,
                    req.body.JobBoardName,
                    data[0].UserID

                ]


                require("../queryDB").request(sql, Inserfields, connection)
                    .then(
                        (data) => {
                            //Now we update user
                            //console.log(data)
                            const fields2=[
                                data.insertId,
                                req.logId
                            ]
                            require("../queryDB").request(UpdateUserSQl, fields2, connection)
                                .then(
                                    (data) => {

                                        res.send("Success")


                                    },
                                    (err) => {
                                        res.status(400).send(err);

                                        console.log(err);
                                    }
                                );

                        },
                        (err) => {
                            res.status(400).send(err);
                            console.log(err);
                        }
                    );
            },
            (err) => {
                res.status(400).send(err);
                console.log(err);
            }
        );
}
module.exports = {postBoard};
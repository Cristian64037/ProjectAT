const getBoards = (req, res, connection) => {
    const sql = `Select LastUpdated,JobBoardID,BoardName from JobBoards where UserID = (Select UserID from User where LogInId=?)`;
    const fields = req.logId;

    require("../../queryDB").request(sql, fields, connection)
        .then(
            (data) => {
                //console.log(data);
                res.status(200).json({
                    data:data

                });
            },
            (err) => {
                res.status(400).send(err);
                //console.log(err);
            }
        )
}
module.exports = {getBoards};
const getLatestBoard = (req, res, connection) => {
    const sql = `Select LastUpdated,JobBoardID,BoardName from JobBoards where UserID = (Select UserID from User where LogInId=?) and JobBoardID=(Select CurrentBoard from User where LogInId=?)`;
    const fields = [req.logId,req.logId];

    require("../../queryDB").request(sql, fields, connection)
        .then(
            (data) => {
                //console.log(data);
                if (data.length > 0) {
                    res.status(200).send(data);
                }
            },
            (err) => {
                res.status(400).send("Couldn't Do This");
                //console.log(err);
            }
        );
}
module.exports = {getLatestBoard};
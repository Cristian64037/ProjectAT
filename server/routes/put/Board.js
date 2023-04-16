const putBoard = (req, res, connection) => {
    const sql = `Update User SET CurrentBoard=? where LogInId=?`;
    const fields = [
        req.body.JobBoardID,
        req.logId

    ];


    require("../queryDB").request(sql, fields, connection)
        .then(
            (data) => {
                //console.log(data);
                if (data.length == 0) {
                    res.status(404).send("Not Found");
                } else {
                    res.status(202).send(data);
                }
            },
            (err) => {
                res.status(400).send(err);
                //console.log(err);
            }
        );
}
module.exports = {putBoard};
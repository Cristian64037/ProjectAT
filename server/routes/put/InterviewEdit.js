const InterviewEdit = (req, res, connection) => {

    const sql = `Update InterviewHistory t SET t.InterviewName = ?, t.Date = ?, t.Time = ?, t.Location = ?, t.Interviewer = ?, t.Notes = ? WHERE t.InterviewID = ?`;
    const fields = [
        req.body.InterviewName,
        req.body.Date,
        req.body.Time,
        req.body.Location,
        req.body.Interviewer,
        req.body.Notes,
        req.body.InterviewID
    ];
    console.log(req.params.id)
    require("../queryDB").request(sql, fields, connection)
        .then(
            (data) => {
                console.log(data)

                res.status(202).send("Success");

            },
            (err) => {
                res.status(400).send(err);
                //console.log(err);
            }
        );


}
module.exports = {InterviewEdit};
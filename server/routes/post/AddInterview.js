const AddInterview = (req, res, connection) => {
    const sql = `Insert into InterviewHistory(InterviewName, JobsID, Date,
            Time, Location, Interviewer, Notes)
            values(?,?,?,?,?,?,?)`;

    const fields = [
        req.body.InterviewName,
       req.body.JobsID,
        req.body.Date,
        req.body.Time,
        req.body.Location,
        req.body.Interviewer,
        req.body.Notes
    ];
    console.log(req.body.ResumeID);
    require("../queryDB").request(sql, fields, connection)
        .then(
            (data) => {
                require("../queryDB").request(sql, fields, connection)
                    .then(
                        (data) => {
                            res.status(202).json("Success")
                        }
                    );
            },
            (err) => {
                res.status(400).send(err);
                //console.log(err);
            }
        );
}
module.exports = {AddInterview};
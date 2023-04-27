const putJob = (req, res, connection) => {

    const sql = `Update Jobs t SET t.CompName = ?, t.PositionName = ?, t.AppliedDate = ?, t.StatusID = ?, t.InterviewRound = ?, t.InterestLevel = ?, t.CoreValues = ?, t.MissionStatement = ?, t.WebUrl = ?, t.Awards = ?, t.ExpectSalary = ?, t.InterviewNotes = ?, t.Resume=? WHERE t.JobsID = ?`;
    const fields=[

        req.body.company,
        req.body.posName,
        req.body.appDate,
        req.body.jobStatus,
        req.body.interviewRound,
        req.body.interest,
        req.body.CoreValues,
        req.body.mission,
        req.body.webLink,
        req.body.awards,
        req.body.salary,
        req.body.notes,
        req.body.ResumeID,
        req.params.id
    ]
    console.log(req.params.id)
    require("../queryDB").request(sql, fields, connection)
        .then(
            (data) => {
                console.log(data)

                res.status(201).send("Success");

            },
            (err) => {
                res.status(400).send(err);
                //console.log(err);
            }
        );


}
module.exports = {putJob};
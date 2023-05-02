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

    let errMsg = "";

    if (fields[0] === '') {
        errMsg += "Company Name is a required field,";
    }
    if (fields[1] === '') {
        errMsg += "Position Name is a required field,";
    }
    if (fields[2] === '') {
        errMsg += "Applied Date is a required field,";
    }
    if (fields[3] === '') {
        errMsg += "Job Status is a required field,";
    }
    if (fields[4] === '') {
        errMsg += "Interview Round is a required field,";
    }
    if (fields[5] === '') {
        errMsg += "Interest Level is a required field,";
    }

    if (errMsg == '') {
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
    } else {
        errMsg = errMsg.slice(0, -1);
        res.status(400).send(errMsg);
    }
}
module.exports = {putJob};
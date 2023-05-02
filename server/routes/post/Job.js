const postJob = (req, res, connection) => {
    const sqlGetCurBoard=`Select CurrentBoard from User where LogInId=?`

    const sql = `Insert into Jobs(JobBoardID, CompName, PositionName,
            AppliedDate, StatusID, InterviewRound, InterestLevel,
            CoreValues, MissionStatement, WebUrl, Awards, ExpectSalary,
            ImportantSkills, InterviewNotes,Resume)
            values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const UpdateDate=`Update JobBoards SET LastUpdated=? where JobBoardID=?`;
    const fields = [
        req.logId,
        req.body.company,
        req.body.posName,
        req.body.appDate,
        req.body.jobStatus,
        req.body.interviewRound,
        req.body.interest,
        req.body.coreValues,
        req.body.mission,
        req.body.webLink,
        req.body.awards,
        req.body.salary,
        req.body.skills,
        req.body.notes,
        req.body.ResumeID
    ];

    let errMsg = "";

    if (fields[1] === '') {
        errMsg += "Company Name is a required field,";
    }
    if (fields[2] === '') {
        errMsg += "Position Name is a required field,";
    }
    if (fields[3] === '') {
        errMsg += "Applied Date is a required field,";
    }
    if (fields[4] === '') {
        errMsg += "Job Status is a required field,";
    }
    if (fields[5] === '') {
        errMsg += "Interview Round is a required field,";
    }
    if (fields[6] === '') {
        errMsg += "Interest Level is a required field,";
    }

    if (errMsg == '') {
        require("../queryDB").request(sqlGetCurBoard, fields.slice(0), connection)
            .then(
                (data) => {

                    fields[0] = data[0].CurrentBoard;
                    require("../queryDB").request(sql, fields, connection)
                        .then(
                            (data) => {
                                //console.log(data)
                                //res.status(201).send(data);
                                let date_ob = new Date();
                                const updateFields = [

                                    date_ob,
                                    fields[0]

                                ]
                                require("../queryDB").request(UpdateDate, updateFields, connection)
                                    .then(
                                        (data) => {
                                            ////console.log(data)
                                            res.status(201).send(data);
                                        },
                                        (err) => {
                                            res.status(400).send(err);
                                            ////console.log(err);
                                        }
                                    );
                            },
                            (err) => {
                                res.status(400).send(err);
                                ////console.log(err);
                            }
                        );
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
module.exports = {postJob};
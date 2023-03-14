const addJob = (req, res, connection) => {
    return new Promise((resolve, reject) => {
        //TO DO
        //Map job status to proper number
        //Map interest level to proper number

        connection.query(
            `Insert into Jobs(
            JobBoardID,
            CompName,
            PositionName,
            AppliedDate,
            StatusID,
            InterviewRound,
            InterestLevel,
            CoreValues,
            MissionStatement,
            WebUrl,
            Awards,
            ExpectSalary,
            ImportantSkills,
            InterviewNotes
            )
            values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
                req.body.board,
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
                req.body.notes
            ], function (err, result) {
                if (!err) {
                    console.log("Post Successful: /jobs ...");
                    resolve(result);
                } else {
                    console.log(`Post Error: /jobs ...`);
                    console.log("===============");
                    console.log(err);
                }
            });
    });
}
module.exports = {addJob}
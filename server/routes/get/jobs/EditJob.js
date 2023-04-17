const getJobToEdit = (req, res, connection) => {
    const sql = `Select CompName, d.DocName,PositionName,
            AppliedDate, StatusID, InterviewRound, InterestLevel,
            CoreValues, MissionStatement, WebUrl, Awards, ExpectSalary,
            ImportantSkills, InterviewNotes from Jobs j Left JOIN Documents d on j.Resume= d.DocID where j.JobsID = ?`;
    const fields = [req.params.id];

    require("../../queryDB").request(sql, fields, connection)
        .then(
            (data) => {
                console.log(data);
                if (data.length == 0) {
                    res.status(404).send("Job not found");
                } else {
                    res.status(200).send(data);
                }
            },
            (err) => {
                res.status(400).send(err);
                //console.log(err);
            }
        );
}
module.exports = {getJobToEdit};
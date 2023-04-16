const getJobs = (req, res, connection) => {
    const sql = `Select JobBoardID,JobsID,CompName, PositionName, AppliedDate, e.Name AS Status, i.Name AS Interest, ExpectSalary
                 from (Jobs INNER JOIN JobStatus e ON Jobs.StatusID = e.StatusID) INNER JOIN InterestLevel i ON Jobs.InterestLevel = i.InterestLevelID
                 where JobBoardID = (Select CurrentBoard from User where LogInId=?)`;
    const fields = req.logId;

    require("../../queryDB").request(sql, fields, connection)
        .then(
            (data) => {

                res.status(200).send(data);

            },
            (err) => {
                res.status(400).send(err);
                //console.log(err);
            }
        );
}
module.exports = {getJobs};
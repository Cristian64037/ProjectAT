const getInterviewHistory = (req, res, connection) => {
    const sql = `Select * from InterviewHistory where JobsID=?`;
    const fields = [req.params.jobID];

    require("../../queryDB").request(sql, fields, connection)
        .then(
            (data) => {
                console.log(data);
                res.status(200).json(data);

            },
            (err) => {
                res.status(400).send(err);
            }
        );
}
module.exports = {getInterviewHistory};
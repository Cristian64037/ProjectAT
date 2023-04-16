const getResumesForJobApp = (req, res, connection) => {
    const sql=`Select * from Documents where BoxCardID=1 and UserID=(Select UserID from User where LogInId=?)`;
    const fields = [req.logId];

    require("../../queryDB").request(sql, fields, connection)
        .then(
            (data) => {
                console.log('HELLOIN')
                res.status(200).json(data);
                console.log(data)

            },
            (err) => {
                console.log(err)
                res.status(400).send(err);

            }
        );
}
module.exports = {getResumesForJobApp};
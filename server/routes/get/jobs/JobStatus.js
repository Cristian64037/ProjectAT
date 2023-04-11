const getJobStatus = (req, res, connection) => {
    const sql = `Select * from JobStatus`;
    const fields=[];

    require("../../queryDB").request(sql,fields, connection)
        .then(
            (data) => {
                //console.log(data);

                res.status(200).send(data);

            },

            (err) => {
                res.status(400).send(err);
                ////console.log(err);
            }
        );
}
module.exports = {getJobStatus};
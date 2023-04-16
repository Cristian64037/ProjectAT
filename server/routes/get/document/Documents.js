const getDocuments = (req, res, connection) => {
    const sql=`Select * from BoxCard`;
    const field=[];

    require("../../queryDB").request(sql, field, connection)
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
module.exports = {getDocuments};
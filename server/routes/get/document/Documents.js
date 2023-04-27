const getDocuments = (req, res, connection) => {
    const sql=`Select * from BoxCard`;
    const field=[];
    let Docss=[]

    require("../../queryDB").request(sql, field, connection)
        .then(
            (data) => {
                const fields2=[1,2,3,4,5,6];
                let Docs=[                    [1,"Resume",[]],
                    [2,"Behavioral Questions",[]],
                    [3,"Cover Letter",[]],
                    [4,"Elevator Pitch",[]],
                    [5,"Recommendation Letters",[]],
                    [6,"Technical Questions",[]]
                ];
                const sql2=`Select * from Documents where BoxCardID=? and UserID=(Select UserID from User where LogInId=?)`;

                const promises = [];

                for (let i = 1; i < fields2.length ; i++) {
                    const fields4=[]
                    fields4.push(i);
                    fields4.push(req.logId);
                    const promise = require("../../queryDB").request(sql2,fields4,connection)
                        .then(
                            (docs) => {
                                if(docs.length>=1){
                                    let PrevValues=Docs[i][2];
                                    for (let j = 0; j <docs.length ; j++) {
                                        PrevValues.push(docs[j].DocName)
                                    }
                                    Docs[i][2]=PrevValues
                                }
                                //console.log(Docs);
                            });
                    promises.push(promise);
                }

                Promise.all(promises).then(() => {
                    Docss = Docs;
                    console.log(Docss)
                    res.status(200).send(Docss);
                });
            },
            (err) => {
                res.status(400).send(err);
            }
        );
}
module.exports = {getDocuments};
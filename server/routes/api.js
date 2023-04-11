const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypts = require('bcrypt');

//Current USER while Session tokens is done
const UserIdActive=28;

//Initialize DB
const connection = require('../database/connection');
const {verify} = require("jsonwebtoken");
const verifyJWTBackEnd = (req,res,next)=>{
    const token = req.headers["x-access-token"];
    if (!token) {
        console.log("No Token");
        return res
            .status(401)
            .json({ auth: false, message: "Yo, we need a token. Please given it next time" });
    } else {
        jwt.verify(token, process.env.token, (err, decoded) => {
            if (err) {
                console.log("============TOKEN FAILED=========");
                console.log(err);
                console.log(token);
                return res
                    .status(500)
                    .json({ auth: false, message: "You failed to authenticate" });
            } else {
                console.log("============TOKEN SUCCEEDED=========");
                req.logId = decoded.sub;
                console.log(req.logId);
                next();
            }
        });
    }}

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]
    console.log(token)
    if (!token) {
        console.log("No Token")
        res.send("Yo, we need a token. Please given it next time");
    } else {
        jwt.verify(token, process.env.token, (err, decoded) => {
           if (err) {
               console.log("============TOKEN FAILED=========")
               console.log(err);
               console.log(token);
               res.json({
                   auth: false,
                   message: "You failed to authenticate"
               });
           } else {
               console.log("============TOKEN SUCCEEDED=========")
               req.logId = decoded.sub;
               console.log(req.logId);
               next();
               res.json({
                   auth: true,
                   message: "You are authenticated"
               });
           }
        });
    }
}
/*==============
==GET Requests==
==============*/

//Get a list of interview history
router.get('/InterviewHistory/:jobID', (req, res) => {
    require("./get/interview/InterviewHistory").getInterviewHistory(req, res, connection);
});

//Get a list of jobs based on the user's identification and Job Board identification (populates Job Tracker UI)
router.get('/jobs', verifyJWTBackEnd, (req, res) => {
    require("./get/jobs/Jobs").getJobs(req, res, connection);
});

//Get a specific job so a user can edit its details (populates Edit Job Form UI)
router.get('/jobs/edit/:id', (req, res) => {
    require("./get/jobs/EditJob").getJobToEdit(req, res, connection);
});

//Todo Eliminate Route?
//Get a list of jobs in the interview stage and documents to support the user (populates drop-down and documents in the interview UI)
router.get('/interview/:id', verifyJWTBackEnd, (req, res) => {
    const sql = `Select JobsID, CompName, PositionName from Jobs where (JobBoardID = (Select CurrentBoard from User where LogInId=?) and StatusID = 2)`;
    const fields = req.logId;

    require("./queryDB").request(sql, fields, connection)
        .then(
            (data) => {
                //console.log(data);
                if (data.length == 0) {
                    res.status(404).send("Interview Jobs not found");
                } else {
                    res.status(200).send(data);
                }
            },
            (err) => {
                res.status(400).send(err);
                //console.log(err);
            }
        );
});

//Todo Eliminate Route?
//Get a specific job in the interview stage (populates job details in the interview UI)
router.get('/interview/job/:id', (req, res) => {
    const sql = `Select JobsID, CompName, PositionName, AppliedDate, StatusID, InterviewRound, InterestLevel from Jobs where JobsID = ?`;
    const fields = [req.params.id];

    require("./queryDB").request(sql, fields, connection)
        .then(
            (data) => {
                //console.log(data);
                if (data.length == 0) {
                    res.status(404).send("Interview Job not found");
                } else {
                    res.status(200).send(data);
                }
            },
            (err) => {
                res.status(400).send(err);
                //console.log(err);
            }
        );
});

//Gets the box cards and the documents within each for a specific user (populates documents UI)
router.get('/documents', (req, res) => {
   require("./get/document/Documents").getDocuments(req, res, connection);
});

//Gets the list of boards by the specific user (populates dropdown in Board UI)
router.get('/board', verifyJWTBackEnd, (req, res) => {
   require("./get/board/Boards").getBoards(req, res, connection);
});

//Gets the Board name and lastest updated date (populates Job Tracking UI)
router.get('/Latestboard', verifyJWTBackEnd,(req, res) => {
   require("./get/board/LatestBoard").getLatestBoard(req, res, connection);
});

router.get('/JobStatus', (req, res) => {
    require("./get/jobs/JobStatus").getJobStatus(req, res, connection);
});

router.get('/InterestLevel', (req, res) => {
    require("./get/jobs/InterestLevel").getInterestLevel(req, res, connection);
});

//Checks if the user is Authenticated
router.get('/isAuth', verifyJWT);

/*==============
==POST Requests==
==============*/

//Gets the specific user to validate if credential are correct (informs login UI)
router.post('/auth', (req, res) => {
    require("./post/Authenticate").authenticate(req, res, connection);
});

//Add a job to a job board for a specific user
router.post('/jobs',verifyJWTBackEnd, (req, res) => {
    require("./post/Job").postJob(req, res, connection);
});

//Add a user for login
router.post('/login', async (req, res) => {

    let insertId="";
    const sql = `Insert into LogIn(UserName, PSWD, RecoverEmail) values(?,?,?)`;
    let hashedPassword =  await bcrypts.hash(req.body.password, 8);
    //console.log(hashedPassword);
    const fields = [
        req.body.username,
        hashedPassword,
        req.body.email
    ];
    const sql2 = `Insert into User(LogInId, FName, LName, Email) values(?,?,?,?)`;

    const checkIfUserNameExists=`Select * from LogIn where UserName=?`;
    const userName=req.body.username


    require("./queryDB").request(checkIfUserNameExists, userName, connection)
        .then(
            (data) => {
                if(data.length>0){
                    res.status(400).send("User Name Exists");
                }else {

                    require("./queryDB").request(sql, fields, connection)
                        .then(
                            (data) => {

                                insertId=data.insertId;
                                const fields2 = [
                                    data.insertId,
                                    req.body.firstName,
                                    req.body.lastName,
                                    req.body.email
                                ];

                                require("./queryDB").request(sql2, fields2, connection)
                                    .then(
                                        (data) => {
                                            res.status(201).send("Account Created Successfully");
                                        },
                                        (err) => {
                                            res.status(400).send(err);
                                            //console.log(err);
                                        }
                                    );

                            },
                            (err) => {
                                res.status(400).send(err);
                                //console.log(err);
                            }
                        );
                }

            },


            (err) => {
                res.status(400).send(err);
                //console.log(err);
            }
        );




    //console.log(insertId);



});

//ToDo Not working . Maybe blacklist???
router.post('/logout', (req, res) => {
    const token = req.headers["x-access-token"];

    console.log("\n\n\n\nK")


        // Add token to blacklist




});

//Add a document for a specific user in a specific box card
router.post('/documents',verifyJWTBackEnd, (req, res) => {

});

//Add a job board for a specific user
router.post('/board',verifyJWTBackEnd, (req, res) => {
    let date_ob = new Date();
    const fields = [
        req.logId
    ];
    console.log(req.body)
    const getUserIDSQL=`Select UserID from User where LogInId=?`;
    const sql=`Insert into JobBoards(CreateDate,LastUpdated,BoardName,UserID) value(?,?,?,?)`;
    const UpdateUserSQl=`Update User Set CurrentBoard=? where LogInID=?`;
    console.log("================PATH========================");

    require("./queryDB").request(getUserIDSQL, fields[0], connection)
        .then(
            ( data) => {
                //console.log(data[0].UserID);
                fields.push(data[0].UserID);

                const Inserfields=[
                    date_ob,
                    date_ob,
                    req.body.JobBoardName,
                    data[0].UserID

                ]


                require("./queryDB").request(sql, Inserfields, connection)
                    .then(
                        (data) => {
                            //Now we update user
                            //console.log(data)
                            const fields2=[
                                data.insertId,
                                req.logId
                            ]
                            require("./queryDB").request(UpdateUserSQl, fields2, connection)
                                .then(
                                    (data) => {

                                        res.send("Success")


                                    },
                                    (err) => {
                                        res.status(400).send(err);

                                        console.log(err);
                                    }
                                );

                        },
                        (err) => {
                            res.status(400).send(err);
                            console.log(err);
                        }
                    );
            },
            (err) => {
                res.status(400).send(err);
                console.log(err);
            }
        );

});

/*==============
==PUT Requests==
==============*/

//Edit a specific job record in a job board for a specific user
router.put('/jobs/edit/:id', (req, res) => {

    const sql = `Update Jobs t SET t.CompName = ?, t.PositionName = ?, t.AppliedDate = ?, t.StatusID = ?, t.InterviewRound = ?, t.InterestLevel = ?, t.CoreValues = ?, t.MissionStatement = ?, t.WebUrl = ?, t.Awards = ?, t.ExpectSalary = ?, t.InterviewNotes = ? WHERE t.JobsID = ?`;
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
        req.params.id
    ]
    console.log(req.params.id)
    require("./queryDB").request(sql, fields, connection)
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


});

//Edit the current board a specific user
router.put('/board', verifyJWTBackEnd,(req, res) => {
    const sql = `Update User SET CurrentBoard=? where LogInId=?`;
    const fields = [
        req.body.JobBoardID,
        req.logId

    ];


    require("./queryDB").request(sql, fields, connection)
        .then(
            (data) => {
                //console.log(data);
                if (data.length == 0) {
                    res.status(404).send("Not Found");
                } else {
                    res.status(202).send(data);
                }
            },
            (err) => {
                res.status(400).send(err);
                //console.log(err);
            }
        );

});

router.put('/OneTimePassWordChange',async(req, res) =>{
    const pswd="CL";
    let hashedPassword =  await bcrypts.hash(pswd, 8);
    const field=[
        hashedPassword
    ]

    const sql=` UPDATE LogIn t SET t.PSWD = ? WHERE t.LogInId = 4 `;
    require("./queryDB").request(sql, field, connection)
        .then(

            (err) => {
                res.status(400).send(err);
                //console.log(err);
            }
        );

})

module.exports = router;
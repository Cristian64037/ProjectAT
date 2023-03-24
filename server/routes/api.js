const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypts = require('bcrypt');

//Current USER while Session tokens is done
const UserIdActive=28;

//Initialize DB
const connection = require('../database/connection');

/*==============
==GET Requests==
==============*/

//Get a list of jobs based on the user's identification and Job Board identification (populates Job Tracker UI)
router.get('/jobs/:id', (req, res) => {
    const sql = `Select CompName, PositionName, AppliedDate, e.Name, InterviewRound, InterestLevel, ExpectSalary
                 from Jobs INNER JOIN JobStatus e ON Jobs.StatusID = e.StatusID where JobBoardID = (Select CurrentBoard from User where LogInId=?)`;
    const fields = [req.params.id];

    require("./queryDB").request(sql, fields, connection)
        .then(
            (data) => {
                console.log(data);
                if (data.length == 0) {
                    res.status(404).send("No JobBoards found for User");
                } else {
                    res.status(200).send(data);
                }
            },
            (err) => {
                res.status(400).send(err);
                console.log(err);
            }
        );
});

//Get a specific job so a user can edit its details (populates Edit Job Form UI)
router.get('/jobs/edit/:id', (req, res) => {
    const sql = `Select CompName, PositionName,
            AppliedDate, StatusID, InterviewRound, InterestLevel,
            CoreValues, MissionStatement, WebUrl, Awards, ExpectSalary,
            ImportantSkills, InterviewNotes from Jobs where JobsID = ?`;
    const fields = [req.params.id];

    require("./queryDB").request(sql, fields, connection)
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
                console.log(err);
            }
        );
});

//Get a list of jobs in the interview stage and documents to support the user (populates drop-down and documents in the interview UI)
router.get('/interview/:id', (req, res) => {
    const sql = `Select CompName, PositionName from Jobs where (JobBoardID = (Select CurrentBoard from User where LogInId=?) and StatusID = 2)`;
    const fields = [req.params.id];

    require("./queryDB").request(sql, fields, connection)
        .then(
            (data) => {
                console.log(data);
                if (data.length == 0) {
                    res.status(404).send("Interview Jobs not found");
                } else {
                    res.status(200).send(data);
                }
            },
            (err) => {
                res.status(400).send(err);
                console.log(err);
            }
        );
});

//Get a specific job in the interview stage (populates job details in the interview UI)
router.get('/interview/job', (req, res) => {
    res.send({Type: "GET4"});
});

//Gets the box cards and the documents within each for a specific user (populates documents UI)
router.get('/documents', (req, res) => {
    res.send({Type: "GET5"});
});

//Gets the list of boards by the specific user (populates dropdown in Board UI)
router.get('/board/:LoginID', (req, res) => {
    const sql = `Select JobBoardID from JobBoards where UserID = (Select UserID from User where LogInId=?)`;
    const fields = [req.params.LoginID];
    require("./queryDB").request(sql, fields, connection)
        .then(
            (data) => {
                console.log(data);
                if (data.length == 0) {
                    res.status(200).send("");
                } else {
                    res.status(200).send(data);
                }
            },
            (err) => {
                res.status(400).send(err);
                console.log(err);
            }
        );
});

router.get('/JobStatus', (req, res) => {
    const sql = `Select * from JobStatus`;
    const fields=[]

    require("./queryDB").request(sql,fields, connection)
        .then(
            (data) => {
                console.log(data);

                    res.status(200).send(data);

            },

            (err) => {
                res.status(400).send(err);
                console.log(err);
            }
        );
});

router.get('/InterestLevel', (req, res) => {
    const sql = `Select * from InterestLevel`;
    const fields=[]

    require("./queryDB").request(sql,fields, connection)
        .then(
            (data) => {
                console.log(data);

                res.status(200).send(data);

            },

            (err) => {
                res.status(400).send(err);
                console.log(err);
            }
        );
});
/*==============
==POST Requests==
==============*/

//Gets the specific user to validate if credential are correct (informs login UI)
router.post('/auth', (req, res) => {
    const findUser = `Select PSWD from LogIn where UserName=?`;
    const fields = [
        req.body.User,
        req.body.Pass
    ];

    require("./queryDB").request(findUser, fields[0], connection)
        .then(
            (data) => {
                if(data.length === 0){
                    res.status(400).send("User Name Does Not Exist");
                }else bcrypts.compare(fields[1], data[0].PSWD, function (err, result) {

                    if (result === true) {
                        console.log("'yes'")
                        res.status(201).send("YOu In");
                    } else {
                        console.log("NO")
                        res.status(400).send("Incorrect Password");
                    }

                })

            },
            (err) => {
                res.status(400).send(err);
                console.log(err);
            }
        );
});

//Add a job to a job board for a specific user
//**********************************************************************
//*****************TO DO: Map jobstatus and interest********************
//**********************************************************************
router.post('/jobs', (req, res) => {
    const sql = `Insert into Jobs(JobBoardID, CompName, PositionName,
            AppliedDate, StatusID, InterviewRound, InterestLevel,
            CoreValues, MissionStatement, WebUrl, Awards, ExpectSalary,
            ImportantSkills, InterviewNotes)
            values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const fields = [
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
    ];

    require("./queryDB").request(sql, fields, connection)
        .then(
            (data) => {
                console.log(data)
                res.status(201).send(data);
            },
            (err) => {
                res.status(400).send(err);
                console.log(err);
            }
        );
});

//Add a user for login
router.post('/login', async (req, res) => {

    let insertId="";
    const sql = `Insert into LogIn(UserName, PSWD, RecoverEmail) values(?,?,?)`;
    let hashedPassword =  await bcrypts.hash(req.body.password, 8);
    console.log(hashedPassword);
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
                                            console.log(err);
                                        }
                                    );

                            },
                            (err) => {
                                res.status(400).send(err);
                                console.log(err);
                            }
                        );
                }

            },


            (err) => {
                res.status(400).send(err);
                console.log(err);
            }
        );




    console.log(insertId);



});


//Add a document for a specific user in a specific box card
router.post('/documents', (req, res) => {

});

//Add a job board for a specific user
router.post('/board', (req, res) => {

});

/*==============
==PUT Requests==
==============*/

//Edit a specific job record in a job board for a specific user
router.put('/jobs/edit/:id', (req, res) => {

});

//Edit the current board a specific user
router.put('/login', (req, res) => {

});

module.exports = router;
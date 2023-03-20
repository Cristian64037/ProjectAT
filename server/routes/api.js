const express = require('express');
const router = express.Router();

//Initialize DB
const connection = require('../database/connection');

/*==============
==GET Requests==
==============*/

//Get a list of jobs based on the user's identification and Job Board identification (populates Job Tracker UI)
router.get('/jobs', (req, res) => {
    const sql = `Select CompName, PositionName, AppliedDate, StatusID, InterviewRound, InterestLevel
                 from Jobs where JobBoardID = (Select CurrentBoard from User where LogInId=?)`;
    const fields = [req.body.userId];

    require("./queryDB").request(sql, fields, connection)
        .then(
            (data) => {
                console.log(data);
                if (data.length == 0) {
                    res.status(404).send("No JobBoards found for User");
                } else {
                    res.status(200).send("Jobs found");
                }
            },
            (err) => {
                res.status(400).send(err);
                console.log(err);
            }
        );
});

//Get a specific job so a user can edit its details (populates Edit Job Form UI)
router.get('/jobs/edit', (req, res) => {
    res.send({Type: "GET2"});
});

//Get a list of jobs in the interview stage and documents to support the user (populates drop-down and documents in the interview UI)
router.get('/interview', (req, res) => {
    res.send({Type: "GET3"});
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
router.get('/board', (req, res) => {
    res.send({Type: "GET6"});
});

/*==============
==POST Requests==
==============*/

//Gets the specific user to validate if credential are correct (informs login UI)
router.post('/auth', (req, res) => {
    const sql = `Select * from LogIn where UserName=? and PSWD=?`;
    const fields = [
        req.body.User,
        req.body.Pass
    ];

    require("./queryDB").request(sql, fields, connection)
        .then(
            (data) => {
                console.log(data);
                if (data.length == 0) {
                    res.status(404).send("User name or password is invalid");
                } else {
                    res.status(200).send("Logging in...");
                }
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
                res.status(201).send("Job Added Succesfully");
            },
            (err) => {
                res.status(400).send(err);
                console.log(err);
            }
        );
});

//Add a user for login
router.post('/login', (req, res) => {
    const sql = `Insert into LogIn(UserName, PSWD, RecoverEmail) values(?,?,?)`;
    const fields = [
        req.body.username,
        req.body.password,
        req.body.recover
    ];

    require("./queryDB").request(sql, fields, connection)
        .then(
            (data) => {
                console.log(data)
                res.status(201).send("Account Created Successfully");
            },
            (err) => {
                res.status(400).send(err);
                console.log(err);
            }
        );
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
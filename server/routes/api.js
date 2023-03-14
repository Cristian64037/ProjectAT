const express = require('express');
const router = express.Router();

//Initialize DB
const connection = require('../database/connection');

/*==============
==GET Requests==
==============*/

//Get a list of jobs based on the user's identification and Job Board identification (populates Job Tracker UI)
router.get('/jobs', (req, res) => {
    const test = () => new Promise((resolve, reject) => {
        connection.query("Select * from Persons", function (err, result) {
            if (!err) {
                console.log("GET Successful: /jobs ...");
                resolve(result);
            } else {
                console.log(`GET Error: /jobs ...`);
                console.log("===============");
                console.log(err);
            }
        });
    });

    Promise.all([test()]).then((data) => {
        res.send({data});
    });
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

//Gets the specific user to validate if credential are correct (informs login UI)
router.get('/login', (req, res) => {
    const login = () => new Promise((resolve, reject) => {
        let username = req.body.User;
        let password = req.body.Pass;

        connection.query(`Select * from LogIn where UserName=? and PSWD=?`, [username, password], function (err, result) {
            if (!err) {
                console.log("GET Successful: /login ...");
                resolve(result);
            } else {
                console.log(`GET Error: /login ...`);
                console.log("===============");
                console.log(err);
            }
        });
    });

    Promise.all([login()]).then((data) => {
        res.send({data});
    });
});

/*==============
==POST Requests==
==============*/

//Add a job to a job board for a specific user
router.post('/jobs', (req, res) => {
    const occupation = require("./post/jobs").addJob(req, res, connection);

    Promise.all([occupation]).then((data) => {
        res.send({
            state: "Success",
            data
        });
    });
});

//Add a user for login
router.post('/login', (req, res) => {
    const newUser = require("./post/login").addLogin(req, res, connection);

    Promise.all([newUser]).then((data) => {
        res.send({
            state: "Success",
            data
        });
    });
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
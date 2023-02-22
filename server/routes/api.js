const express = require('express');
const router = express.Router();

/*==============
==GET Requests==
==============*/

//Get a list of jobs based on the user's identification and Job Board identification (populates Job Tracker UI)
router.get('/jobs', (req, res) => {
    res.send({Type: "GET"});
});

//Get a specific job so a user can edit its details (populates Edit Job Form UI)
router.get('/jobs/edit', (req, res) => {
    res.send({Type: "GET"});
});

//Get a list of jobs in the interview stage and documents to support the user (populates drop-down and documents in the interview UI)
router.get('/interview', (req, res) => {
    res.send({Type: "GET"});
});

//Get a specific job in the interview stage (populates job details in the interview UI)
router.get('/interview/job', (req, res) => {
    res.send({Type: "GET"});
});

//Gets the box cards and the documents within each for a specific user (populates documents UI)
router.get('/documents', (req, res) => {
    res.send({Type: "GET"});
});

//Gets the list of boards by the specific user (populates dropdown in Board UI)
router.get('/board', (req, res) => {
    res.send({Type: "GET"});
});

//Gets the specific user to validate if credential are correct (informs login UI)
router.get('/login', (req, res) => {
    res.send({Type: "GET"});
});

/*==============
==POST Requests==
==============*/
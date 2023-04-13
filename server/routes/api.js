const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypts = require('bcrypt');

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

//Gets The Resumes available for the Job Application UI
router.get('/getResumesJobBoard',verifyJWTBackEnd,(req,res)=>{
    require("./get/document/ResumesForJobApp").getResumesForJobApp(req,res,connection);
})

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
router.post('/login', (req, res) => {
    require("./post/Login").postLogin(req, res, connection);
});

//Add a document for a specific user in a specific box card
router.post('/documents',verifyJWTBackEnd, (req, res) => {

});

//Add a job board for a specific user
router.post('/board',verifyJWTBackEnd, (req, res) => {
    require("./post/Board").postBoard(req, res, connection);
});



/*==============
==PUT Requests==
==============*/

//Edit a specific job record in a job board for a specific user
router.put('/jobs/edit/:id', (req, res) => {
    require("./put/EditJob").putJob(req, res, connection);
});

//Edit the current board a specific user
router.put('/board', verifyJWTBackEnd,(req, res) => {
   require("./put/Board").putBoard(req, res, connection);
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
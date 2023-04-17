import {Link, redirect} from "react-router-dom";
import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {Container, Row, Col, Form, Button, Card} from 'react-bootstrap';
import Moment from "moment";
import {useLocation} from "react-router";
import {checkAuth} from "../../functions/checkAuth";



const InterviewHistory=()=>{
    const navigate = useNavigate();
    const [User,setUser]= useState("");
    const [Password,setPass]= useState("");
    const [logInresult,setLogInResult]= useState("");
    const [loginStatus, setLoginStatus] = useState(false);
    const [auth,setAuth]= useState(false);
    const [InterviewHistory, setInterviewHistory]= useState([]);
    const [Job, setJob]= useState([]);
    const [formState, setFormState] = useState({
        CompanyName: '',
        ApplyDate: '',
        Awards: '',

        CoreValues: '',
        ExpectedSalary: '',
        MissionStatement: '',

        JobTitle: '',
        JobStatus: '',
        Website: '',
        InterestLevel: '',
        InterviewRound: '',
        Notes: '',
        Resume:''
    });
    const { state } = useLocation();

    const [editInterviewInfo,setEditInterviewInfo]= useState({
        Date:'',
        Time:'',
        Interviewer:'',
        Location:'',
        Title:'',
        Notes:''

        }
    );


    function createNewCard(InterviewID) {
        if(isNaN(InterviewID)){
            setJob("NAN")
            alert("New Card")
            setEditInterviewInfo(prevState => ({
                ...prevState,
                Date:'yyyy-mm-dd',
                Time:'hh:mm',
                Interviewer:'',
                Location:'',
                Title:'',
                Notes:''
            }));



        }else{
            setJob(InterviewID);
            console.log()
            alert("Updating!");
            try{
            setEditInterviewInfo(prevState => ({
                ...prevState,
                Date: InterviewHistory[InterviewID].Date,
                Time: InterviewHistory[InterviewID].Time,
                Interviewer: InterviewHistory[InterviewID].Interviewer,
                Location: InterviewHistory[InterviewID].Location,
                Title: InterviewHistory[InterviewID].InterviewName,
                Notes: InterviewHistory[InterviewID].Notes,
            }));}catch (e) {
                console.log(e);


            }



        }


    }
    async function getInterviewsThatHappened(number) {
        const response = await fetch("http://localhost:3306/api/InterviewHistory/" + number, {
            method: 'Get',
            headers: {
                'content-type': 'application/json',
                "x-access-token": localStorage.getItem("token")
            }
        });

        if (response) {
            console.log("============FETCHING History==============");
            return await response.json();
        }


    }

    async function getJobDetails(number) {
        const response = await fetch("http://localhost:3306/api/jobs/edit/"+number, {
            method: 'Get',
            headers: {
                'content-type': 'application/json',
                "x-access-token": localStorage.getItem("token")
            }
        });

        if (response) {
            console.log("============FETCHING Job Details==============");
            return await response.json();
        }

    }

    useEffect(() => {
        //Check if we came with a job here
        //If we Did display info otherwise don't

        //We Send Number We Got From Arrival
        checkAuth().then(body => {
            if (body.auth) {
                setAuth(true);

                try{
                    const { JobsID } = state;
                    console.log("envienv"+JobsID)
                    getJobDetails(JobsID).then(body => {
                        //setJob(body[0])

                        setFormState(prevState => ({
                            ...prevState,
                            CompanyName: body[0].CompName,
                            ApplyDate: body[0].AppliedDate,
                            Awards: body[0].Awards,

                            CoreValues: body[0].CoreValues,
                            ExpectedSalary: body[0].ExpectSalary,
                            MissionStatement: body[0].MissionStatement,

                            JobTitle: body[0].PositionName,
                            JobStatus: body[0].StatusID,
                            Website: body[0].WebUrl,
                            InterestLevel: body[0].InterestLevel,
                            InterviewRound: body[0].InterviewRound,
                            Notes: body[0].InterviewNotes,
                            Resume: body[0].DocName
                        }));
                        console.log(body[0]);

                    });
                    getInterviewsThatHappened(JobsID).then(body => {
                        console.log(body);
                        setInterviewHistory(body);
                    });


                }catch (e) {
                    alert("Valid Page but only if you click from job")
                    navigate(`/boards`)


                }


            } else {
                navigate('/unauthorized');
            }
        });


    }, []);




    return (
        <Container id={"IntHistory"} style={{height:"100vh"}} >
            <Row style={{height:"66.67%"}} className={"Style-Rows"} >
            <Col md={3} style={{overflowY: "scroll",height:"100%",marginRight:15}} className={"My-col"} >
                <Container rows={4}>
                    <h2 style={{textAlign:"center"}}>Company Information</h2>
                    <Row>
                        <Col sm={6} >
                            <p><b>Company Name:</b> {formState.CompanyName}</p>
                            <p><b>Applied Date:</b> {formState.ApplyDate}</p>
                            <p><b>Job Title:</b> {formState.JobTitle}</p>
                            <p><b>Status:</b> {formState.JobStatus}</p>
                            <p><b>Interview Round:</b> {formState.InterviewRound}</p>
                            <p><b>Interest Level:</b> {formState.InterestLevel}</p>
                            <p><b>Website:</b> {formState.Website}</p>
                            <p><b>Mission Statement:</b>  {formState.MissionStatement} </p>

                        </Col>
                        <Col sm={6} >
                            <p><b>Core Values:</b> {formState.CoreValues} </p>
                            <p><b>Awards:</b> {formState.Awards}</p>
                            <p><b>Expected Salary:</b> {formState.ExpectedSalary}</p>
                            <p><b>Notes:</b>  {formState.Notes}</p>
                        </Col>
                    </Row>

                </Container>
            </Col>
            <Col md={8} style={{height:"100%"}} className={"My-col"}>
                <Container rows={10} style={{height:"98%"}}>
                    <h3 style={{textAlign:"center"}}>{editInterviewInfo.Title}</h3>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group controlId="formDate">
                                    <Form.Label>Date:</Form.Label>
                                    <Form.Control type="date" placeholder="yyyy-mm-dd"  value={editInterviewInfo.Date} onChange={(event) => {
                                        setEditInterviewInfo({ ...editInterviewInfo, Date: event.target.value });
                                    }}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formTime">
                                    <Form.Label>Time:</Form.Label>
                                    <Form.Control type="time" placeholder="hh:mm" value={editInterviewInfo.Time} onChange={(event) => {
                                        setEditInterviewInfo({ ...editInterviewInfo, Time: event.target.value });
                                    }}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formInterviewer">
                                    <Form.Label>Interviewer:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter interviewer" value={editInterviewInfo.Interviewer} onChange={(event) => {
                                        setEditInterviewInfo({ ...editInterviewInfo, Interviewer: event.target.value });
                                    }} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formLocation">
                                    <Form.Label>Location:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter location" value={editInterviewInfo.Location}  onChange={(event) => {
                                        setEditInterviewInfo({ ...editInterviewInfo, Location: event.target.value });
                                    }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formTitle">
                                    <Form.Label>Title:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Title" value={editInterviewInfo.Title}
                                                  onChange={(event) => {
                                                      setEditInterviewInfo({ ...editInterviewInfo, Title: event.target.value });
                                                  }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId="formNotes">
                            <Form.Label>Notes:</Form.Label>
                            <Form.Control as="textarea" rows={10} value={editInterviewInfo.Notes} onChange={event => (
                                setEditInterviewInfo({ ...editInterviewInfo, Notes: event.target.value })
                            )}/>
                        </Form.Group>
                        <br/>

                        <Button variant="primary" type="submit" >
                            Save
                        </Button>

                    </Form>
                </Container>
            </Col>
            </Row>


            <Row className={"Style-Rows"}>
                <Col md={3} style={{marginRight:"15px"}} className={"My-col"}>
                    <Container>


                    <p style={{textAlign:"center"}}><b>Resume</b></p>

                        <p><b>Company Name:</b> {formState.Resume==null?"NO RESUME LINKED":formState.Resume}</p>


                    </Container>

                </Col>
                <Col md={8} className={"My-col"} >
                    <Container>

                    <p style={{textAlign:"center"}}>
                        <b>
                            Interview History

                        </b>
                    </p>

                        <div className="cards-container" style={{overflowX: "auto"}}>
                            <div className="row cards d-flex flex-nowrap">
                                {InterviewHistory.map((Interview,index)=>(
                                    <Card>
                                        <Card.Title>
                                           {Interview.InterviewName}
                                        </Card.Title>
                                        <Card.Body>
                                            <button style={{backgroundColor: '#191c1f', color: 'white'}} onClick={() => {
                                                createNewCard(index);

                                            }}>Edit Job
                                            </button>
                                        </Card.Body>
                                    </Card>


                                    ))}
                                <Card>
                                    <Card.Body>
                                        <Button variant="primary" onClick={createNewCard}>Add Interview</Button>
                                    </Card.Body>
                                </Card>
                            </div>


                    </div>
                    </Container>
                </Col>
            </Row>

        </Container>
    );
}
export default InterviewHistory;
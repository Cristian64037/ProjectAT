import {Link, redirect} from "react-router-dom";
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';



const InterviewHistory=()=>{
    const navigate = useNavigate();
    const [User,setUser]= useState("");
    const [Password,setPass]= useState("");
    const [logInresult,setLogInResult]= useState("");
    const [loginStatus, setLoginStatus] = useState(false);



    return (
        <Container id={"IntHistory"}>

            <main>
                <Container rows={10} style={{overflowY: "scroll"}}>
                    <h2>Company Information</h2>
                    <Row>
                        <Col sm={6}>
                            <p><b>Company Name:</b> ACME Inc.</p>
                            <p><b>Applied Date:</b> January 1, 2023</p>
                            <p><b>Job Title:</b> Senior Software Engineer</p>
                            <p><b>Status:</b> Applied</p>
                            <p><b>Interview Round:</b> 1</p>
                            <p><b>Interest Level:</b> High</p>
                            <p><b>Website:</b> www.acme.com</p>
                            <p><b>Mission Statement:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut fringilla metus, quis auctor eros. Vestibulum tristique purus in commodo ultricies.</p>

                        </Col>
                        <Col sm={6}>
                            <p><b>Core Values:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut fringilla metus, quis auctor eros. Vestibulum tristique purus in commodo ultricies.</p>
                            <p><b>Awards:</b> Best Place to Work 2022, Top 100 Companies 2022</p>
                            <p><b>Expected Salary:</b> $120,000</p>
                            <p><b>Notes:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut fringilla metus, quis auctor eros. Vestibulum tristique purus in commodo ultricies.</p>
                        </Col>
                    </Row>

                </Container>

                <div className="container2 container-fluid">
                    <Row>
                        <Col>
                            <h3>Interview Details</h3>
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formDate">
                                            <Form.Label>Date:</Form.Label>
                                            <Form.Control type="date" placeholder="Enter date" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formTime">
                                            <Form.Label>Time:</Form.Label>
                                            <Form.Control type="time" placeholder="Enter time" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formInterviewer">
                                            <Form.Label>Interviewer:</Form.Label>
                                            <Form.Control type="text" placeholder="Enter interviewer" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formLocation">
                                            <Form.Label>Location:</Form.Label>
                                            <Form.Control type="text" placeholder="Enter location" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group controlId="formNotes">
                                    <Form.Label>Notes:</Form.Label>
                                    <Form.Control as="textarea" rows={10} />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Save
                                </Button>
                            </Form>
                        </Col>
                    </Row>



                </div>

                <div className="container3">
                    <p><b>Feedback</b></p>

                    <br /><br />
                    <form action="save_file.php" enctype="multipart/form-data" method="post" style={{ display: 'flex', alignItems: 'center' }}></form>
                </div>
                <div className="container4">
                    <p>
                        <b>
                            Interview History

                            <button type="button">New Round</button>
                        </b>
                    </p>

                    <div className="scroll-container2">
                        <div className="card-wrapper">
                            <div className="card">
                                <p style={{ fontSize: '12px' }}>Round 1</p>
                            </div>
                            <div className="card">
                                <p style={{ fontSize: '12px' }}>Round 2</p>
                            </div>
                            <div className="card">
                                <p style={{ fontSize: '12px' }}>Round 3</p>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                </div>
            </main>
        </Container>
    );
}
export default InterviewHistory;
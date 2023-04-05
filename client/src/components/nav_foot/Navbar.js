import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useEffect, useState} from "react";
function CollapsibleExample() {
    const [auth,setAuth]= useState(false);
    useEffect(() => {
        const checkAuth = async () => {
            const response = await fetch("http://localhost:3306/api/isAuth", {
                method: 'Get',
                headers: {
                    'content-type': 'application/json',
                    "x-access-token": localStorage.getItem("token")
                }
            });

            if (response) {
                console.log("============AUTHENTICATING==============");
                return await response.json();
            }
        }
        checkAuth().then(body => {
            console.log(body.auth);
            setAuth(body.auth);

        });
    }, []);
    return (
        <Navbar sticky="top" collapseOnSelect expand="lg">
            <Container>
                <Navbar.Brand href="/login">ProjectAt</Navbar.Brand>


                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                {auth ?
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="m-auto">
                        <Nav.Link href="/interviewPrep"> Interview Prep </Nav.Link>
                        <Nav.Link href="/boards"> Board </Nav.Link>
                        <Nav.Link href="/JobApplicationForm"> Job Form</Nav.Link>
                        <Nav.Link href="/documents"> Documents </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/login" id="BookAppointmentLogo"> Sign Out </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                    :
                    <Nav>
                        <Nav.Link href="/login" id="BookAppointmentLogo"> Sign In </Nav.Link>
                    </Nav>
                }

            </Container>
        </Navbar>
    );
}

export default CollapsibleExample;
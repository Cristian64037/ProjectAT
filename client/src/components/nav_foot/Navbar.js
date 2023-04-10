import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
function CollapsibleExample() {
    const [auth,setAuth]= useState(false);
    const location = useLocation();
    const navigate = useNavigate();

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
    }, [location]);

    async function handleLogout() {
        alert("Logging eveveveveout");
        localStorage.removeItem('token');

        //This is not working

        await fetch('http://localhost:3306/api/logout', {
            method: 'Post',
            headers: {
                'content-type': 'application/json',
                "x-access-token": localStorage.getItem("token")
            }
        }).then(async (data) => {
            console.log("COMPLETED")
            localStorage.removeItem('token');
            navigate(`/login`)

        });
    }

    return (
        <Navbar sticky="top" collapseOnSelect expand="lg">
            <Container>


                {auth ?
                    <>
                    <Navbar.Brand href="/">ProjectAt</Navbar.Brand>


                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="m-auto">
                        <Nav.Link href="/interviewPrep"> Interview Prep </Nav.Link>
                        <Nav.Link href="/boards"> Board </Nav.Link>
                        <Nav.Link href="/JobApplicationForm"> Job Form</Nav.Link>
                        <Nav.Link href="/documents"> Documents </Nav.Link>
                        <Nav.Link href="/"> Change Board </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/login" id="BookAppointmentLogo" onClick={handleLogout} > Sign Out </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                    </>
                    :
                    <>
                        <Navbar.Brand href="/login">ProjectAt</Navbar.Brand>


                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Nav>
                        <Nav.Link href="/login" id="BookAppointmentLogo"> Sign In </Nav.Link>
                    </Nav>
                    </>

                }

            </Container>
        </Navbar>
    );
}

export default CollapsibleExample;
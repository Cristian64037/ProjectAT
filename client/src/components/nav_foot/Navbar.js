import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import {checkAuth} from "../../functions/checkAuth";
function CollapsibleExample() {
    const [auth,setAuth]= useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth().then(body => {
            console.log(body.auth);
            setAuth(body.auth);

        });
    }, [location]);

    async function handleLogout() {
        localStorage.removeItem('token');
        navigate(`/login`)

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
                        <Nav.Link href="/"> Job Searchs </Nav.Link>
                        <Nav.Link href="/boards"> Job Board </Nav.Link>
                        <Nav.Link href="/documents"> Documents </Nav.Link>
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
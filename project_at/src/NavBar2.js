import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function CollapsibleExample() {
  return (
    <Navbar sticky="top" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="/boards">ProjectAt</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
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
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
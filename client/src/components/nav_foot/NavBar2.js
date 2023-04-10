import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function CollapsibleExample() {
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
            if (body.auth) {
                setAuth(true);
                fetchData().then(body => {
                    console.log(body);
                    setjobs(body);
                    setJobBoardId(body[0].JobBoardID);
                    setIspending(true);
                });
                getBoardData().then(body => {
                    //console.log(body);
                    console.log(body[0][0])
                    setBoardName(body[0].BoardName);
                    setLastUpdatedDate(body[0].LastUpdated);
                    jobs && FormatTable();
                });
            } else {
                navigate('/unauthorized')
            }
        });
    }, [isPending]);
  return (
    <Navbar sticky="top" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="/">ProjectAt</Navbar.Brand>
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
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";

const FootEnd=()=>{
    return(
        <div className="fixed-bottom container-fluid foot-container">
            <Container>
                <Row>
                    <Col align={"left"}>
                        <p>
                            <a className="feedback" href={"https://booksy.com/en-us/"}> Feedback </a>
                        </p>
                    </Col>
                    <Col align={"right"}>
                        <p>@ Project AT CopyRight 2023</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default FootEnd;
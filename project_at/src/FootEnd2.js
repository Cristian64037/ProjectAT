import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";

const FootEnd=()=>{
    return(
        <div className="fixed-bottom container-fluid" style={{backgroundColor:"grey"}}>

            <Container>
                <Row>
                    <Col align={"left"}>
                        <p>
                            <a href={"https://booksy.com/en-us/"}> Feedback </a> <br/>
                        </p>
                    </Col>
                    <Col align={"right"}>
                        <p> @ Project AT CopyRight 2023</p>
                    </Col>

                </Row>
            </Container>

        </div>


    );
}
export default FootEnd;
import React, {Fragment} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

function WhoisCard(props) {

    if (props.whois!== null && !props.notRegistered) {
        props.nextStep('checkDns')
    }
    return(
        <Row>
        <Col sm={3}>
        </Col>
        <Col sm={6}>
        <Card bg={ props.notRegistered ? "danger" : "success"} text="black" style={{ width: '18rem' }}>
        <Card.Header>{props.domain}</Card.Header>
            <Card.Body>
            <Fragment>
            <Card.Title >Whois results: 
            </Card.Title>
            <Card.Text>
                { ( props.whois===null || props.notRegistered )  ? "Did you type a valid domain?" : props.expiry }
            </Card.Text>
            </Fragment>
            </Card.Body>
        </Card>
        </Col>
        <Col sm={3}>
        </Col>
        </Row>
    )
}

export default WhoisCard
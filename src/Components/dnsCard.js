import React, {Fragment} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

function DnsCard(props) {
    const aRecord =  props.dns.find( record => record.type === "A")
    return(
        <Row>
        <Col sm={3}>
        </Col>
        <Col sm={6}>
        <Card bg={ props.dns.length === 0  ? "danger" : "success"} text="black" style={{ width: '18rem' }}>
        <Card.Header>{props.domain}</Card.Header>
            <Card.Body>
            <Fragment>
            <Card.Title >A record: 
            </Card.Title>
            <Card.Text>
                { ( !aRecord )  ? "No A Record Found :(" : aRecord.rdata }
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

export default DnsCard
import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const InternalError = () => {
    return (
        <div id="internalError">
            <Card bg="danger" text="white" style={{ marginTop: '3em' }}>
                <Card.Header as="h3">500(Internal Server) Error</Card.Header>
                <Card.Body>
                    <Card.Title>
                        The page you have entered results in a 500(Internal Server) Error.</Card.Title>
                    <Card.Text> This is typically caused by a fatal error in the site's code. 
                    </Card.Text>
                    <Button variant="info" 
                            href="https://www.elegantthemes.com/blog/tips-tricks/how-to-fix-the-500-internal-server-error-on-your-wordpress-website"
                            target="blank">
                            How to troubleshoot
                    </Button>
                </Card.Body>
            </Card> 
        </div>

    )
}

export default InternalError
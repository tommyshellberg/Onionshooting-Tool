import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../src/css/bootstrap.min.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import DomainSearch from './Components/domainSearch'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showIntro: true
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="Onionshooting" />
          <h1 className="App-title">Onionshooting Tool</h1>
        </header>
        <Container className="fixed-width" style={ { marginTop: '2em' } }>
          <Row>
            <Col sm={2}>
            </Col>
            <Col sm={8}>
              { this.state.showIntro && <Card>
                <Card.Header>Wtf is onionshooting?</Card.Header>
                <Card.Body>
                  <Card.Title>Troubleshooting a site is like peeling away layers of an onion. </Card.Title>
                  <Card.Text>
                    Start with the outer layer(the domain) and peel away the potential issues one at a time.
                    <br/>Each test brings you closer to the server and to the actual code of the website.
                    <br/>To get started, type in either a full URL path or a domain name.
                  </Card.Text>
                  <Button variant="primary" onClick={ () => this.setState({ showIntro: false })}>Dismiss</Button>
                </Card.Body>
              </Card> }
              <DomainSearch/>
            </Col>
            <Col sm={2}>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;

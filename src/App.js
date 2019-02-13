import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../src/css/bootstrap.min.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import DomainSearch from './Components/domainSearch'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="Onionshooting" />
          <h1 className="App-title">Onionshooting Tool</h1>
        </header>
        <p className="App-intro">
          To get started, type in either a full URL path or a domain name.
        </p>
        <Container className="fixed-width">
          <Row>
            <Col sm={2}>
            </Col>
            <Col sm={8}>
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

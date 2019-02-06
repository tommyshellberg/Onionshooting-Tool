import React, {Component, Fragment } from 'react'
import Form from 'react-bootstrap/Form'
import validator from 'validator'
import axios from 'axios'
import WhoisCard from './whoisCard'
import DnsCard from './dnsCard'

class DomainSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {
          domain: "",
          whois: {},
          expiry: '',
          hideWhois: true,
          dns: [],
          currentStep: {
            checkDomain:true,
            checkWhois: false,
            checkDns: false,
            checkPage: false
        }
            
        }
      }

    
    goToNextStep = (next) => {
        this.setState( prevState => {
            currentStep: {
                prevState.currentStep[next] = true
            }
        })
    }
    

    isValidDomain = () => {
        return validator.isFQDN(this.state.domain)
      }
      
      handleDomainChange = (e) => {
        this.setState({
          domain: e.target.value
        })
        if (this.isValidDomain() && this.state.domain !== '') {
            return this.queryWHOIS(this.state.domain)
        } else {
            this.expiry = "Not a valid domain!"
        }
      }
      
      queryWHOIS = (domain) => {
        axios.get(`https://cors-anywhere.herokuapp.com/http://dotnul.com/api/whois/${domain}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
          .then( response => {
            // handle success
            const whois = response.data.whois
            let notRegistered = whois.search("Domain Name:")
            if( notRegistered === -1 ) {
                notRegistered = true
            } else {
                notRegistered = false
            }
            const expiryString = whois.search("Expiry Date: ")
            const expiry = whois.slice(expiryString, expiryString + 23)
            this.setState({
              whois,
              expiry,
              hideWhois: false,
              notRegistered,
              currentStep: {
                checkWhois: true
              }
            })
            this.digQuery(this.state.domain)
          })
          .catch(function (error) {
            // handle error
            console.log(error);
            })
      }

      digQuery = (domain) => {
          axios.get(`https://cors-anywhere.herokuapp.com/http://dotnul.com/api/dns/${domain}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } } )
          .then(res => {
              // trim the response to the array of dns records returned.
              const response = res.data.dig.answer
              this.setState({
                  dns: response
              })
          })
      }

    render() {
        return (
                <Fragment>
                    <Form>
                        <Form.Group controlId="formGroupDomain">
                        <Form.Label>Domain name</Form.Label>
                        <Form.Control type="text" placeholder="Enter domain name" onChange={ this.handleDomainChange} value={this.state.domain}/>
                        </Form.Group>
                    </Form>

                    { this.state.currentStep.checkWhois &&
                    <WhoisCard
                    domain={this.state.domain}
                    notRegistered = {this.state.notRegistered}
                    whois = {this.state.whois}
                    expiry = {this.state.expiry}
                    nextStep = { this.goToNextStep }
                    />}

                    { this.state.currentStep.checkDns &&
                    <DnsCard
                    domain={this.state.domain}
                    dns = {this.state.dns}
                    nextStep = { this.goToNextStep }
                    />}     
                </Fragment>
               )
    }
}

export default DomainSearch
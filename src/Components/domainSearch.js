import React, {Component, Fragment } from 'react'
import Form from 'react-bootstrap/Form'
import validator from 'validator'
import axios from 'axios'
import ResultsTable from './resultsTable'
import parseDomain from 'parse-domain'
import Fade from 'react-bootstrap/Fade'
import { debounce } from "lodash";
import ProgressBar from 'react-bootstrap/ProgressBar'

class DomainSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {
          domain: '',
          url: '',
          pageLookup: '',
          responseCode: null,
          whois: {},
          expiry: '',
          dns: [],
          progress: 0,
          notRegistered: null            
        }
      }

    // When this component updates, check if the state has changed(the input has changed) and then try parsing domain and URL.
    componentDidUpdate(prevProps, prevState) {
        if (this.state.url !== prevState.url) {
            this.grabDomainAndURL(this.state.url)
            this.setState({ progress: 0 })
        }
    }

    // check the parsed domain and make sure it's a valid domain using validator library.
    isValidDomain = () => {
        return validator.isFQDN(this.state.domain)
      }

    /* Take the text input and parse a domain and URL path from it. 
     * Set the state accordingly and then query the domain.
     *
     */

    grabDomainAndURL = debounce((path) => {
        const parsedDomain = parseDomain(path)
        if (!parsedDomain) return
        const FQDN = `${parsedDomain.domain}.${parsedDomain.tld}`
        if (FQDN) this.setState(prevState => {
            return {
                domain: FQDN,
                progress: prevState.progress + 20
            }
        })
        if (this.isValidDomain() && this.state.domain !== '') {
            return this.queryWHOIS(this.state.domain)
        } else {
            this.expiry = "Not a valid domain!"
        }
    }, 1000)
      
    // When a user types a domain/path into the input field, immediately set the URL prop of state
    // Then, send the URL from state to the debounced parsing function which is invoked after 1 second of non-input.
    handleChange = (path) => {
        this.setState({url: path}) 
    }
      
    queryWHOIS = (domain) => {
        axios.get(`https://cors-anywhere.herokuapp.com/http://dotnul.com/api/whois/${domain}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
          .then( response => {
            // handle success
            console.log(response.data)
            const whois = response.data.whois
            let notRegistered = whois.search("Domain Name:")
            if( notRegistered === -1 || whois==null || response.data.error === true ) {
                notRegistered = true
            } else {
                notRegistered = false
            }
            const expiryString = whois.search("Expiry Date: ")
            const expiry = whois.slice(expiryString, expiryString + 23)
            this.setState( (prevState) => {
                return {
                    whois,
                    expiry,
                    notRegistered,
                    progress: prevState.progress + 20
                }
            })
          })
          .then(this.digQuery(this.state.domain))
          .then(this.pageQuery(this.state.url))
          // .then(this.builtWithQuery())
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
              this.setState( prevState => {
                  return {
                    dns: response,
                    progress: prevState.progress + 20
                  }
              })
          })
    }

    pageQuery = (url) => {
        axios.get(`https://cors-anywhere.herokuapp.com/${url}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } } )
        .then( res => {
            const responseCode = res.status
            const responseText = res.statusText
                return this.setState( prevState => {
                    return {
                    pageLookup: responseText,
                    responseCode,
                    progress: prevState.progress + 20  
                    }                    
                })
        }).catch(err => {
            this.setState({
            pageLookup: err.response.statusText,
            responseCode: err.response.status
            })
        })
    }

    render() {
        let domainPresent = ((!this.state.domain || 0 === this.state.domain.length) ? false : true)
        return (
                <Fragment>
                    <Form>
                        <Form.Group controlId="formGroupDomain">
                        <Form.Label>Domain name</Form.Label>
                        <Form.Control type="text" placeholder="Enter domain name" 
                            onPaste={ e => this.handleChange(e.target.value) }
                            onChange={ e => this.handleChange(e.target.value) } 
                            value={this.state.url}/>
                        </Form.Group>
                    </Form>
                    { this.state.domain && <Fade in={ domainPresent ? true : false }>
                    <ResultsTable
                    dns = {this.state.dns}
                    whois = {this.state.whois}
                    notRegistered = {this.state.notRegistered}
                    expiry = {this.state.expiry}
                    pageLookup = {this.state.pageLookup}
                    responseCode = {this.state.responseCode} >
                    </ResultsTable>
                    </Fade> }
                <ProgressBar>
                    <ProgressBar animated striped variant="success" now={this.state.progress} key={1} />
                </ProgressBar>
                </Fragment>
               )
    }
}

export default DomainSearch
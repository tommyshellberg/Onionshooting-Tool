import React from 'react'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import JsError from './jsError'

const ResultsTable = (props) => {


    const aRecord =  props.dns.find( record => record.type === "A")

    return (
    <Table striped bordered hover>
        <thead>
            <tr>
            <th>Test</th>
            <th>Result</th>
            <th>Pass/Fail</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>Is the domain registered?</td>
            <td>{props.notRegistered ? "Not registered." : "Registered."}</td>
            <td><Alert variant={props.notRegistered ? "danger" : "success"}>{props.notRegistered ? "Fail" : "Pass"}</Alert></td>
            </tr>
            <tr>
            <td>Is the domain active(not expired)?</td>
            <td>{ ( props.whois===null || props.notRegistered )  ? "Not registered or expired." : props.expiry }</td>
            <td><Alert variant={ ( props.whois===null || props.notRegistered ) ? "danger" : "success" }>{!props.expiry ? "Fail" : "Pass"}</Alert></td>
            </tr>
            <tr>
            <td>Does the domain resolve to an IP Address(valid A record)?</td>
            <td >{ ( !aRecord )  ? "No A Record Found." : aRecord.rdata }</td>
            <td><Alert variant={ !aRecord ? "danger" : "success" }>{!aRecord ? "Fail" : "Pass" }</Alert></td>
            </tr>
            <tr>
            <td>Does the URL(if provided) return an HTTP error?</td>
            <td >{ `${props.responseCode} - ${props.pageLookup}`}</td>
            <td><Alert variant={ props.responseCode!==200 ? "danger" : "success"}>{ props.responseCode!==200 ? "Fail" : "Pass"}</Alert></td>
            </tr>
            <JsError></JsError>
            </tbody>
    </Table>
    )
}


export default ResultsTable
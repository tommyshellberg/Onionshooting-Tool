import React from 'react'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import JsError from './jsError'
import HttpError from './httpError';
import ARecord from './aRecord';
import BuiltWith from './builtWith'

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
                <td><p>Is the domain registered?</p></td>
                <td>{props.notRegistered ? "Not registered." : "Registered."}</td>
                <td><Alert variant={props.notRegistered ? "danger" : "success"}>{props.notRegistered ? "Fail" : "Pass"}</Alert></td>
            </tr>
            <tr>
                <td><p>Is the domain active(not expired)?</p></td>
                <td>{ ( props.whois===null || props.notRegistered )  ? "Not registered or expired." : props.expiry }</td>
                <td><Alert variant={ ( props.whois===null || props.notRegistered ) ? "danger" : "success" }>{!props.expiry ? "Fail" : "Pass"}</Alert></td>
            </tr>
            <tr>
                <td><p>Does the domain resolve to an IP Address?</p>
                    <ARecord></ARecord>
                </td>
                <td >{ ( !aRecord )  ? "No A Record Found." : aRecord.rdata }</td>
                <td><Alert variant={ !aRecord ? "danger" : "success" }>{!aRecord ? "Fail" : "Pass" }</Alert></td>
            </tr>
            <tr>
                <td><p>Does the URL(if provided) return an HTTP error?</p>
                    <HttpError></HttpError>
                </td>
                <td >{ `${props.responseCode} - ${props.pageLookup}`}</td>
                <td><Alert variant={ props.responseCode!==200 ? "danger" : "success"}>{ props.responseCode!==200 ? "Fail" : "Pass"}</Alert></td>
            </tr>
            <BuiltWith
                isWooCommerce =     { props.isWooCommerce }
                isWordPress =       { props.isWordPress }
            />
            <JsError updateProgress = {props.updateProgress}></JsError>
            </tbody>
    </Table>
    )
}


export default ResultsTable
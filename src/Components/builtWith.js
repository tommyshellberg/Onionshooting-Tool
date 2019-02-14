import React, {Fragment} from 'react'
import Alert from 'react-bootstrap/Alert'

const BuiltWith = ( props ) => {
    return(
        <Fragment>
            <tr>
                <td>
                    Is this a WordPress site?
                </td>
                <td>
                    {props.isWordPress ? "Yes" : "No"}
                </td>
                <td>
                    <Alert variant={props.isWordPress ? "success" : "danger"}>
                        {props.isWordPress ? "Pass" : "Fail"}
                    </Alert>
                </td>
            </tr>
            <tr>
                <td>
                    Is this a WooCommerce site?
                </td>
                <td>
                    {props.isWooCommerce ? "Yes" : "No"}
                </td>
                <td>
                    <Alert variant={props.isWooCommerce ? "success" : "danger"}>
                        {props.isWooCommerce ? "Pass" : "Fail"}
                    </Alert>
                </td>
            </tr>
        </Fragment>
    )
}

export default BuiltWith
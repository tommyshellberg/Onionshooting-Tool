import React, {Fragment} from 'react'
import WPLogo from '../img/wordpress.svg'
import WCLogo from '../img/woocommerce.svg'

const DisplayWPIcon = (prop) => {
    return (
        <img 
        alt="WordPress logo"
        style={prop}
        className="techlogo" 
        src={WPLogo}></img>
    )
}

const DisplayWCIcon = (prop) => {
    return (
        <img 
        alt="WooCommerce logo"
        style={prop}
        className="techlogo" 
        src={WCLogo}></img>
    )
}

const BuiltWith = ( props ) => {
    return(
        <Fragment>
            <tr>
                <td>
                    WordPress/WooCommerce site?
                </td>
                <td colSpan="2">
                    <DisplayWPIcon opacity= {props.isWordPress ?  1: .2 } />
                    <DisplayWCIcon opacity= {props.isWooCommerce ? 1: .2 } />
                </td>
            </tr>
        </Fragment>
    )
}

export default BuiltWith
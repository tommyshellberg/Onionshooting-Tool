import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Popover from 'react-bootstrap/Popover'
import Alert from 'react-bootstrap/Alert'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

const jsLink = 'https://codex.wordpress.org/Using_Your_Browser_to_Diagnose_JavaScript_Errors'

class JsError extends Component {
    constructor(props) {
        super(props)
        this.state = {
            testPass: null
        }
    }

    popover = (
        <Popover id="popover-jsError" title="Javascript Errors">
            <p>In Firefox and Chrome, press <strong>Ctrl + Shift + J.</strong></p>
            <p><a href={jsLink} target="blank">Further help</a></p>
        </Popover>
      );
      
    JsPopover = () => (
        <OverlayTrigger trigger="click" placement="left" overlay={this.popover}>
        <Button variant="light">How do I know?</Button>
        </OverlayTrigger>
      );

    render() {
        return (
            <tr>
            <td>
            <p>If the above all pass are there any JavaScript errors?</p>
            <this.JsPopover />
            </td>
                <td>
                    <ButtonGroup size="lg">
                    <Button onClick={ () => { 
                        this.setState({testPass: false})
                        this.props.updateProgress(-20)
                    }}
                    >Yes</Button>
                    </ButtonGroup>
                    <ButtonGroup size="lg">
                    <Button onClick={ () => {
                        this.setState({testPass: true})
                        this.props.updateProgress(20)
                        } }>No</Button>
                    </ButtonGroup>
            </td>
            <td>
                { this.state.testPass!==null && <Alert variant={this.state.testPass ? "success" : "danger"}>
            {this.state.testPass ? "Pass" : "Fail"}
            </Alert> }
            </td>
          </tr>
        )
    }
}

export default JsError
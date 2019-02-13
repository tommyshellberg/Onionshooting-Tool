import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Popover from 'react-bootstrap/Popover'
import Alert from 'react-bootstrap/Alert'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

const jsLink = 'https://codex.wordpress.org/Using_Your_Browser_to_Diagnose_JavaScript_Errors'

const popover = (
    <Popover id="popover-jsError" title="Javascript Errors">
        <p>In Firefox and Chrome, press <strong>Ctrl + Shift + J.</strong></p>
        <p><a href={jsLink} target="blank">Further help</a></p>
    </Popover>
  );
  
  const JsPopover = () => (
    <OverlayTrigger trigger="click" placement="left" overlay={popover}>
    <button>How?</button>
    </OverlayTrigger>
  );

  const jsError = () => {
      return (
          <tr>
            <td>
            <p>If the above all pass are there any JavaScript errors?</p>
            <JsPopover />
            </td>
                <td>
                    <ButtonToolbar>
                    <ButtonGroup>
                    <Button>Yes</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                    <Button>No</Button>
                    </ButtonGroup>
                    </ButtonToolbar>
            </td>
            <td><Alert></Alert></td>
          </tr>
        
      )
  }
  
  export default jsError
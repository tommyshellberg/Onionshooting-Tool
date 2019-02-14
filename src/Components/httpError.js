import React from 'react'
import Button from 'react-bootstrap/Button'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

const httpLink = 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status'

const popover = (
    <Popover id="popover-httpError" title="HTTP Responses">
        <p>A proper HTTP response code would be <strong>200.</strong></p>
        <p>Error codes will usually be 4xx or 5xx.</p>
        <p><a href={httpLink} target="blank">Further help</a></p>
    </Popover>
  );
  
  const HttpPopover = () => (
    <OverlayTrigger trigger="click" placement="left" overlay={popover}>
    <Button variant="light">What's that?</Button>
    </OverlayTrigger>
  );

  const HttpError = () => {
      return (
            <HttpPopover />        
      )
  }
  
  export default HttpError
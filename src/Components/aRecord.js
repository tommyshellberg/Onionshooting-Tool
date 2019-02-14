import React from 'react'
import Button from 'react-bootstrap/Button'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

const aRecordLink = 'https://www.name.com/support/articles/205516858-Understanding-DNS-record-types'

const popover = (
    <Popover id="popover-jsError" title="Javascript Errors">
        <p>The domain should be pointing to a server using an A Record</p>
        <p>This links the domain to an IP Address on the server.</p>
        <p><a href={aRecordLink} target="blank">Further info</a></p>
    </Popover>
  );
  
const ARecordPopover = () => (
    <OverlayTrigger trigger="click" placement="left" overlay={popover}>
    <Button variant="light">Explain</Button>
    </OverlayTrigger>
  );

const ARecord = () => {
    return (
        <ARecordPopover/>
    )
}

export default ARecord
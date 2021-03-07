import React, { Component } from 'react'
import { Segment, Header, Icon } from 'semantic-ui-react';
import "../../css/MessageHeader.css" ;
export class MessageHeader extends Component {
  render() {
    let { activeChannel } = this.props
    return (
    
       <div className="messageHeader" >
         <h2>
         { activeChannel.name[0].toUpperCase() + activeChannel.name.slice(1) }
         </h2>
         <h4>
            Description : <span>{activeChannel.description[0].toUpperCase() + activeChannel.description.slice(1)}</span>
         </h4>
          

       </div>
       
        
    )
  }
}

export default MessageHeader

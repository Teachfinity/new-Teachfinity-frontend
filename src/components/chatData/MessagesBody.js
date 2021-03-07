import React, { Component } from 'react'

import moment from 'moment'
import "../../css/MessagesBody.css" ;
export class MessagesBody extends Component {

  componentDidMount(){
    this.scrollDown()
  }
  
  componentDidUpdate( a, b ){
    this.scrollDown()
  }

  scrollDown(){
    const { contaniner } = this.refs
    contaniner.scrollTop = contaniner.scrollHeight
  }

  render() {
    let { messages , user, typingUser } = this.props
    return (
    
        <div ref='contaniner' className="messageBody" >
          <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '.1em', paddingRight: '.5em' }}>
            {
              messages.length > 0 && (
                messages.map( message => (
               
                    <div
                    className= {` ${message.sender===user.nickname ? "messageBody__sender" : "messageBody__receiver"}`}
                     
                    >
                      <h3>{message.message}</h3>
                     <p> {message.sender[0].toUpperCase() + message.sender.slice(1)} Send @ { moment(message.timef).fromNow()}</p>
                    </div>
                   
                
                ))
              )
            }
            { 
              typingUser && typingUser.map( name => (
                <div key={name} className="typing-user">
									{`${name[0].toUpperCase() + name.slice(1)} is typing . . .`}
								</div>
              ))
            }
          </div>
        </div>
     
    )
  }
}

export default MessagesBody

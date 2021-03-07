import React, { Component } from 'react'

import "../../css/MessageInput.css" ;
export class MessageInput extends Component {
  state = {
    msg: ''
  }

  handleChange = e => this.setState({ msg: e.target.value })

  handleSubmit = (e) => {
    e.preventDefault() ;
    this.props.sendMsg( this.state.msg )
    this.setState({ msg: '' })
  }

  handleOnFocused = () => this.props.sendTyping( true )

  handleOnBlur = () => this.props.sendTyping( false )

  render() {
    let { msg } = this.state 
    return (
      <div className="messageInput">

        <form onSubmit={msg.length > 0 ? this.handleSubmit : null }>
          <input

            name='msg'
            value={msg}
            placeholder='Write your message'
            onChange={this.handleChange}
            onFocus = {this.handleOnFocused}
            onBlur = {this.handleOnBlur}
          />
          <button type="submit" />
        </form>
      </div>
     
    )
  }
}

export default MessageInput

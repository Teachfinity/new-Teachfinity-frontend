import React, { Component } from 'react'
import event from  '../../events'
import { Icon, Form, Message } from 'semantic-ui-react';
import "../../css/Chat.css" ;
export class LoginPage extends Component {
  state = {
    nickname: '',
    error: '' ,
   
  }
  
  isvalid = ({ nickname }) => nickname

  setUser = ({ user, isUser }) =>  {
    
    if( isUser ) {
      this.setState({ error: 'This nickname already taken'})
    } else {
      this.setState({ error : '' })
      this.props.setUser( user )
    }
  }

  handleChange = e => {
    this.setState({ nickname: e.target.value })
  }

  
  handleSubmit = () => {
    let { socket } = this.props
    let { nickname } = this.state
    
    this.isvalid( this.state ) ?   socket.emit( event.IS_USER, nickname, this.setUser ) :
    this.setState({ error : 'Please input your nickname'})
  }

  render() {
    return (
     
       <div className="chat__login" >
         <div className="chat__loginHeader">
         <h2>Welcome to chats</h2>
         <p>You need to enter a nickname to continue with chats</p>
           </div>
         <div className="chat__loginForm">

          <Form size='small' onSubmit={this.handleSubmit}>
            <Form.Input 
              className=""
              name='nickname'
              type='text'
              placeholder='Your nickname !'
              onChange={this.handleChange}
              autoFocus
              icon={<Icon name='add user' link circular inverted onClick={ this.handleSubmit } />}
            />
            { this.state.error && (
              <Message negative>{ this.state.error }</Message>
            )}
          </Form>
         </div>
         <img className="chat__loginImg" src="https://eyeonindie.com/wp-content/uploads/2020/08/ClutteredPlayfulAnteater-size_restricted.gif" />
       
            
        
       </div>
        
   
    )
  }
}

export default LoginPage

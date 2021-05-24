import React, { Component } from 'react'
import events from '../../events'
import { Menu, Label, Message } from 'semantic-ui-react'
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css' ;
import "../../css/ChatSidebar.css" ;
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RateReviewIcon from '@material-ui/icons/RateReview';
import FaceIcon from '@material-ui/icons/Face';

export class Sidebar extends Component {

  state = {
    modal: false,
    channelName: '',
    channelDescription: '',
    error: null
  }

  displayChannels = chats => (
    chats.map(chat => (
      <div
       className="chatSidebar__channelRow"
        key={chat.name}
        onClick={() => this.props.setActiveChannel(chat.name)}
      
      > 
        # {chat.name}
        
        {chat.msgCount > 0 && <span> {chat.msgCount} </span> }
        
      </div>
    ))
  )

  displayUsers = users => {
    let { user, setActivePChannel, pChats, activeChannel } = this.props
    delete users[user.nickname]
    users = Object.assign({ 'You...': user }, users)
    return Object.keys(users).map(user => {
      let pChat = pChats.filter(pchat => pchat.name === user)
      let msgCount = null
      if (pChat[0] && pChat[0].name !== activeChannel.name) {
        if (pChat[0].msgCount > 0) {
          msgCount = pChat[0].msgCount
        }
      }
      return (
        <div
          key={user}
          onClick={(user === 'You...') ? null : () => setActivePChannel(user)}
          active={this.props.activeChannel.name === user}
          className="chatSidebar__username"
        >
          <div>
          <FaceIcon/> <p>{user[0].toUpperCase() + user.slice(1)}</p> 
          </div>
          <Loader
            style={{ marginLeft: '10px' }}
            size={4} color='white' distance={3}
            visible={pChat[0] ? pChat[0].isTyping : false} />
          {msgCount && <span> {msgCount} </span>}
        </div>
      )
    })
  }

  openModal = () => this.setState({ modal: true })

  closeModal = () => this.setState({ modal: false, channelName: '', channelDescription: '', error: null })

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  isFormValid = ({ channelDescription, channelName }) => {
    if (channelDescription && channelName) {
      this.setState({ error: null })
      return true
    } else {
      this.setState({ error: 'Both Name and Description are required ' })
      return false
    }
  }

  handleSubmit = () => {
    this.setState({ error: null })
    let { channelDescription, channelName } = this.state
    if (this.isFormValid(this.state)) {
      let { socket } = this.props
      socket.emit(events.CHECK_CHANNEL, { channelName, channelDescription }, this.checkChannel)
    }
  }

  checkChannel = isChannel => {
    isChannel ? this.setState({ error: `Channel "${ this.state.channelName }" name alredy take` }) :
    this.closeModal()
  }

  render() {
    let { user, users, chats, logout } = this.props
    let { modal, error } = this.state
    return (
      <div className="chatSidebar" >
        <div className="chatSidebar__header">
        <h1>Teachfinity Chat</h1> 
        <RateReviewIcon />
        </div>
    {/*   */}
        <div className="chatSidebar__channels">
            <div className="chatSidebar__channelsHeader" >
              <span style={{ fontSize: '1.2em' }}>
                 Channel lists
              </span>
              <AddCircleIcon name='add' onClick={this.openModal} />
            </div>
            <div className="chatSidebar__channel">
            {chats[0] && this.displayChannels(chats)}
            </div>
        </div>  
           <br />

          <div className="classSidebar__onlineUsers">

            <div className="classSidebar__onlineUsersHeader" >
              <span style={{ fontSize: '1.2em' }}>
               Online Users
              </span>
            </div>
            <div className="classSidebar__onlineUser">
            {(users && chats[0]) && this.displayUsers(users)}
            </div>
          </div>
          
          <br />
              {/* <div className="chatSidebar__logoutButton">
              <button onClick={logout}>
                 LogOut
              </button>

              </div> */}
           
         {modal && 
         

       <div className="classSidebar__modal" >
         <h2>Add New Channel</h2>
         
            <form>
            
                <input
                  placeholder='Channel Name'
                  name='channelName'
                  onChange={this.handleChange}
                />
            
                <input
                  name='channelDescription'
                  placeholder='Channel Description'
                  onChange={this.handleChange}
                />
           
            </form>
            {
              error && (
                <Message error >
                  <h4>Error</h4>
                  {this.state.error}
                </Message>
              )
            }
     
        <div className="classSidebar__buttons">
            <button className="classSidebar__cancel" onClick={this.closeModal}>
               Cancel
            </button>
            <button  className="classSidebar__add" onClick={this.handleSubmit}>
              Add
            </button>
        </div>
       
      </div>
         }
      
      </div>
    )
  }
}

export default Sidebar

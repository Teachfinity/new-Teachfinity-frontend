import React , {Component} from 'react' ;
import io from "socket.io-client" ;
import events from "../events" ;
import SampleCheck from './chatData/SampleCheck' ;

//  import "../css/Chat.css" ;
import ChatSidebar from "./chatData/ChatSidebar" ;
function Chat() {
    return (
        <div className="chat" >
           {/*  <div className="chat__sidebar">
                <ChatSidebar />
            </div>
            <div className="chat__content">
                This is the chat content area
            </div> */}
            <SampleCheck />
        </div>
    )
}

export default Chat



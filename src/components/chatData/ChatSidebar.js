import React from 'react' ;
import "../../css/ChatSidebar.css" ;
import SearchIcon from '@material-ui/icons/Search';
import ChatContact from "./ChatContact" ;
function ChatSidebar() {
    return (
        <div className="chatSidebar" >
            <div className="chatSidebar__search">
                    <SearchIcon />
                    <input type="text" placeholder="Search users" />
            </div>
            <div className="chatSidebar__contacts">
                <h1>Recents</h1>
                <div className="chatSidebar__contact">
                    <ChatContact username="Ali Zaib"  />
                </div>

            </div>


        </div>
    )
}

export default ChatSidebar

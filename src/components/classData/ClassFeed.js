import React from 'react'
import "../../css/ClassFeed.css"
import MessageSender from './MessageSender'
function ClassFeed() {
    return (
        <div className="classFeed" >
            {/* Message Sender */}
            <MessageSender />
            {/* Posts on the feed */}
        </div>
    )
}

export default ClassFeed

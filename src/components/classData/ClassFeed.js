import React from 'react'
import "../../css/ClassFeed.css"
import MessageSender from './MessageSender'
import Post from './Post'
function ClassFeed() {
    return (
        <div className="classFeed" >
            {/* Message Sender */}
            <MessageSender />
            {/* Posts on the feed */}
            <Post profilepic="" message="Hey This Works" timestamp="10pm" username="Ali Zaib" image={null} />
            <Post profilepic="" message="I am happy" timestamp="10pm" username="Ali Zaib" image="https://media4.giphy.com/media/WgO6VtWJvxh3QiaMEz/giphy.gif" />
        </div>
    )
}

export default ClassFeed

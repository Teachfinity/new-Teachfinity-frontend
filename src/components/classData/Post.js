import { Avatar } from '@material-ui/core';
import React from 'react' ;
import "../../css/Post.css" ;
function Post({profilepic , message,timestamp , username,image}) {
    return (
        <div className="post" >
            <div className="post__top">
                <Avatar src={profilepic} className="post__avatar" />
                <div className="post__topinfo">
                    <h3>{username}</h3>
                    <p>{timestamp}</p>
                </div>
            </div>

            <div className="post__bottom">
                <p>{message}</p>
            </div>
            
            <div className="post__image">
                <img src={image} alt="" />
            </div>

        </div>
    )
}

export default Post

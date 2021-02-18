import { Avatar } from '@material-ui/core';
import React from 'react' ;
import "../../css/Post.css" ;
import moment from 'moment'

function Post({profilepic , message, timestamp , username, image}) {
    const time = moment(timestamp).format('hh:mm A ') ;
    const date = moment(timestamp).format('DD-MM-YYYY');
    const currentDate = Date().toLocaleString()
    const currentMonth = new Date().getMonth()
    const currdate = moment(currentDate).format('DD-MM-YYYY') ;
    return (
        <div className="post" >
            <div className="post__top">
                <Avatar src={profilepic} className="post__avatar" />
                <div className="post__topinfo">
                    <h3>{username}</h3>
                    {
                    date<currdate ? <p>{date} at {time}</p> : <p>{time}</p>
                    }
                </div>
            </div>

            <div className="post__bottom">
                <p>{message}</p>
            </div>
            {image ?
                (<div className="post__image">
                    <img src={image} alt="" />
                </div>)
                : (<></>)
            }
            
        </div>
    )
}

export default Post

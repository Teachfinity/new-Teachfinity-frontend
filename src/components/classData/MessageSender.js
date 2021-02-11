import { Avatar } from '@material-ui/core';
import React , {useState} from 'react'
import "../../css/MessageSender.css" ;
import {selectUser} from "../../features/userSlice" ;
import {useSelector} from "react-redux" ;
function MessageSender() {
    const user  = useSelector(selectUser) ;
    const [message , setMessage] = useState("") ;
    const [image , setImage] = useState("") ;

    const handleSubmit = (e) => {
        e.preventDefault() ;

        alert(message + " " + image) ;
    }
    return (
        <div className="messageSender" >
            <div className="messageSender__top">
                <Avatar src={user.displayPic} style={{width:"50px" , height: "50px"}} />
                <form>
                    <input value={message}
                    className="messageSender__message"
                     onChange={e => setMessage(e.target.value)}
                    placeholder="Enter your message here" />
                    {/* The image to be modified with button to upload image later */}
                    <input value={image}
                    className="messageSender__image"
                    onChange={e => setImage(e.target.value)}
                    placeholder="imageURL (optional)"/>
                    <button onClick={handleSubmit} type="submit" ></button>
                </form>
            </div>
            <div className="messageSender__bottom">

            </div>
        </div>
    )
}

export default MessageSender

import { Avatar } from '@material-ui/core';
import React , {useState} from 'react'
import "../../css/MessageSender.css" ;
import {selectUser} from "../../features/userSlice" ;
import {selectedClass} from "../../features/selectClassSlice" ;
import {useSelector , useDispatch} from "react-redux" ;
import {selectNewPost , newPost} from "../../features/postListSlice" ;
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import axios from 'axios';
import {storageRef} from '../../firebase';

function MessageSender() {
    const dispatch = useDispatch() ;
    const selectClass = useSelector(selectedClass) ;
    const user  = useSelector(selectUser) ;
    const [message , setMessage] = useState("") ;
    const [image , setImage] = useState(null) ;
    const [postId , setPostId] = useState("") ;
    var currentUser = null ;  
    
    const handleSubmit = (e) => {
        e.preventDefault() ;
        /* Post the data in the post schema */
        
            const sendPost = {
                    "message": message,
                    "imagePath": image,
                    "uid": user.uid,
                    "creatorDisplay": user.displayPic ,
                    "creatorName": user.displayName,
                    "classroom": selectClass.id,
                }
            axios.post('http://localhost:5000/posts/addpost', sendPost)
            .then((res) => {
                axios.put('http://localhost:5000/classes/updateclass/'+selectClass.id+'/post/'+res.data._id)
                .catch(err => alert(err))


                dispatch(newPost()) ;
            })
            .then(() => {
                setImage(null) ;
                setMessage("") ;
            })
            .catch(err => alert("Post" + err)) 

       
        
        /* Post the id of the post from the response into the class Schema */
        
    }
    const imageHandler = async(event) =>{
        const file = event.target.files[0];
        if(file){
            console.log(file)
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file);
            setImage(await fileRef.getDownloadURL())
            console.log(await fileRef.getDownloadURL())
        }
        else{
            setImage(null)
        }
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
                    {/* <input value={image}
                    className="messageSender__image"
                    onChange={e => setImage(e.target.value)}
                    placeholder="imageURL (optional)"/> */}
                        <input onChange={imageHandler} id="file-upload" type="file" style={{ display: "none" }} />
                        <label className="messageSender__uploader" htmlFor="file-upload"><PhotoLibraryIcon></PhotoLibraryIcon></label>
                    <button onClick={handleSubmit} type="submit" ></button>
                </form>
            </div>
            <div className="messageSender__bottom">
                {image!==null && <img src={image}/>}
            </div>
        </div>
    )
}

export default MessageSender

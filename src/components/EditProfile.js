import React, {useState , useRef} from 'react';
import CloseIcon from "@material-ui/icons/Close";
import { useSelector, useDispatch } from "react-redux";
import { closeEditProfile } from "../features/editProfileSlice";
import { Avatar } from '@material-ui/core';
import { selectUser , login} from "../features/userSlice";
import "../css/EditProfile.css";
import db , {auth , storageRef} from "../firebase" ;
import axios from 'axios'

function EditProfileForm() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [image , setImage] = useState(user.displayPic);
    const [fileUrl , setFileUrl] = useState(null) ;
    const changedName = useRef(user.displayName) ;
    
    const imageHandler = async (e) =>{
       
        const file = e.target.files[0] ;
        
        
      
        if(file){
            
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file);
            setFileUrl(await fileRef.getDownloadURL());
            
            setImage(await fileRef.getDownloadURL())
            console.log("file changed : " +  await fileRef.getDownloadURL()) ;
            
           
        }
        else{
            setFileUrl(image) ;
        }
        

        
    }
    const handleSubmit =  e => {
        e.preventDefault() ;
        const newname = changedName.current.value
        if(fileUrl){
            const dp = {"dp": fileUrl}
             db.collection("users").doc(auth.currentUser.uid).update({
                 displayPic:  fileUrl ,
                 displayName: newname
                 
             }).then(() => {
     
                 auth.currentUser.updateProfile({
                     displayName: newname ,
                     photoURL: fileUrl
                 })
                
                 
             }).then(()=> {
                 dispatch(login({
                     uid: user.uid ,
                     email: user.email,
                     displayPic:  fileUrl ,
                     displayName: newname 
                   })) ;
             })
             .then(()=>{
                 axios.put("http://localhost:5000/users/updateuser/"+user.uid+"/name/"+newname)
                 .then(()=>{
                    axios.put("http://localhost:5000/users/updateuser/"+user.uid+"/profilePic", dp)
                    .catch(err=>alert(err))
                 })
                 .catch(err=>alert(err))
             })
             .then(()=>{
                axios.put("http://localhost:5000/posts/updatepost/"+user.uid+"/creatorname/"+newname)
                .then(()=>{
                    axios.put("http://localhost:5000/posts/updatepost/"+user.uid+"/creatordp", dp)
                    .catch(err=>alert(err.message))
                 })
                 .catch(err=>alert(err))
             })
             .catch(err => alert(err))
        }
        else{
            db.collection("users").doc(auth.currentUser.uid).update({
                displayPic:  image ,
                displayName: newname
                
            }).then(() => {
    
                auth.currentUser.updateProfile({
                    displayName: newname ,
                    photoURL: image
                })
               
                
            }).then(()=> {
                dispatch(login({
                    uid: user.uid ,
                    email: user.email,
                    displayPic:  image ,
                    displayName: newname 
                  })) ;
            })
            .then(()=>{
                axios.put("http://localhost:5000/users/updateuser/"+user.uid+"/name/"+newname)
                .catch(err=>alert(err))
            })
            .then(()=>{
                axios.put("http://localhost:5000/posts/updatepost/"+user.uid+"/creatorname/"+newname)
                .catch(err=>alert(err))
            })
            .catch(err => alert(err))

        }
    
        dispatch(closeEditProfile())
       console.log(changedName.current.value) ;
    }

    return (
        <div className="editProfile" >
            <div className="editProfile__header">
                <p>Edit Profile</p>
                {<CloseIcon onClick={() => dispatch(closeEditProfile())} />}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="editProfile__avatar">
                    <Avatar src={image} style={{width: "90px", height: "90px" }} />
                    
                    <div className="editProfile__avatarcontent"><h4>{user.displayName}</h4>
                    <input
                        type="file"
                        
                        id="upload-button"
                        onChange={imageHandler}
                        style={{ display: 'none' }} /* Make the file input element invisible */
                    />
                    <label htmlFor="upload-button">
                        <i>Edit Profile Picture</i>
                    </label>
                    </div>
                    
                </div>
                <p>Display Name </p>
                <input className="editProfile__username" name="username" 
                defaultValue={user.displayName}  ref={changedName} />
                <button  type="submit">Confirm Changes</button>

            </form>
        </div>


    )
}

export default EditProfileForm

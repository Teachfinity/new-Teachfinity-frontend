import React, {useState} from 'react';
import CloseIcon from "@material-ui/icons/Close";
import { useSelector, useDispatch } from "react-redux";
import { closeEditProfile } from "../features/editProfileSlice";
import { Avatar } from '@material-ui/core';
import { selectUser } from "../features/userSlice";
import "../css/EditProfile.css";
import db , {auth} from "../firebase" ;
function EditProfileForm() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [image, setImage] = useState(user.displayPic)

    const imageHandler = (e) =>{
        const reader = new FileReader();
        reader.onload = () =>{
            if(reader.readyState===2){
                setImage(reader.result);
               const profilepic = reader.result ;
               db.collection("users").doc(auth.currentUser.uid).update({
                   displayPic: profilepic
                   
               }).then(() => {
                  console.log(reader.result) ;
                auth.currentUser.updateProfile({
                    displayName: "Jane Q. User",
                    photoURL: profilepic
                  }).then(function() {
                    alert("Updated Successfully")
                  }).catch(function(error) {
                    alert(error)
                  });
                  
               }).then(() => {
                   console.log(auth.currentUser)
               }).catch(err => alert(err))
            }
        }
        reader.readAsDataURL(e.target.files[0])
        
    }

    return (
        <div className="editProfile" >
            <div className="editProfile__header">
                <p>Edit Profile</p>
                {<CloseIcon onClick={() => dispatch(closeEditProfile())} />}
            </div>
            <form onSubmit>
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
                <input defaultValue={user.displayName} />
                <button type="submit">Submit</button>

            </form>
        </div>


    )
}

export default EditProfileForm

import React from 'react';
import CloseIcon from "@material-ui/icons/Close";
import {useSelector , useDispatch} from "react-redux" ;
import { closeEditProfile } from "../features/editProfileSlice";
import { Avatar } from '@material-ui/core';
import {selectUser } from "../features/userSlice" ;
import "../css/EditProfile.css";
function EditProfileForm() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser) ;
    return (
        <div className="editProfile" >
            <div className="editProfile__header">
                <p>Edit Profile</p>
                {<CloseIcon onClick={() => dispatch(closeEditProfile())} />}
            </div>
            <form>
                <div className="editProfile__avatar">
                    <Avatar src={user.displayPic} style={{ width: "90px", height: "90px" }} />
                    <div className="editProfile__avatarcontent"><h4>{user.displayName}</h4>
                    <button>Change Profile Picture</button></div>
                </div>
                <p>Display Name </p>
                <input defaultValue={user.displayName}/>
                <p>Email</p>
                <input defaultValue={user.email}/>
                <button>Submit</button>

            </form>
        </div>


    )
}

export default EditProfileForm

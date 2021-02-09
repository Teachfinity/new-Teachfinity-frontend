import React from 'react'
import { Avatar } from '@material-ui/core';
import {useSelector , useDispatch} from "react-redux" ;
import {selectUser } from "../features/userSlice" ;
import {closeAvatarMenu} from "../features/avatarMenuSlice" ;
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {auth} from "../firebase" ;

import "../css/AvatarMenu.css" ;
function AvatarMenu() {
    const user = useSelector(selectUser) ;
    const dispatch = useDispatch() ;
    return (
        <div className="avatarMenu">
            <div className="avatarMenu__userCredentials">
            <Avatar src={user.displayPic} style={{width: "90px" , height: "90px"}} />
            <h4>{user.displayName}</h4>
            </div>

            <div className="avatarMenu__options">
                <button><EditIcon /><p>Edit Profile</p></button>    
                <button><SettingsIcon/><p>Settings</p></button>    
                
            </div> 

            <div className="avatarMenu__logout">
                <button onClick={() =>
                     {
                         dispatch(closeAvatarMenu()) ;
                        auth.signOut() ;
                      
                    
                    }
                     
                     } ><ExitToAppIcon /><p>Log out</p></button>
            </div>

        </div>
    )
}

export default AvatarMenu

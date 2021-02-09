import React, { useEffect, useState } from 'react'

import { Avatar} from "@material-ui/core" ;
import NotificationsIcon from '@material-ui/icons/Notifications';
import Logo from "../images/logo.jpeg" ;

import {openAvatarMenu , closeAvatarMenu} from "../features/avatarMenuSlice" ;
import {useDispatch,useSelector} from "react-redux" ;
import {selectUser} from "../features/userSlice" ;
import "../css/Header.css" ;

function Header() {
    const dispatch = useDispatch() ;
    const user = useSelector(selectUser) ;
    const [popup , setPopup] = useState(false) ;

    useEffect(()=>{
        {popup ? dispatch(openAvatarMenu()) : dispatch(closeAvatarMenu())}
    } , [popup , dispatch]) ;

    

   const toggleMenu = () => {
       
       setPopup(!popup) ;
    
       

    }

   

    return (
        <div className="header" >
            <div className="header__left">
                <img src={Logo} alt="" />
            </div>
            <div className="header__right">
               
                    <NotificationsIcon fontSize="large"  />
                    
                    <Avatar src={user.displayPic} onClick={toggleMenu}  /> 
            </div>
           
           
        </div>
    )
}

export default Header

import React, { useEffect, useState } from 'react'
import { Avatar } from "@material-ui/core";
import NotificationsIcon from '@material-ui/icons/Notifications';
import Logo from "../images/logo.jpeg";
import { StarBorder, Star, MoreVert } from '@material-ui/icons';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import { openAvatarMenu, closeAvatarMenu } from "../features/avatarMenuSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import "../css/Header.css";

function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        { popup ? dispatch(openAvatarMenu()) : dispatch(closeAvatarMenu()) }
    }, [popup, dispatch]);

    const toggleMenu = () => {
        setPopup(!popup);
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
      const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="header" >
            <div className="header__left">
                <img src={Logo} alt="" />
            </div>
            <div className="header__right">
                <div  className="header__icon">
                <IconButton
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <NotificationsIcon className="notification__icon" fontSize="large" />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                >
                </Menu>
                </div>
                <Avatar src={user.displayPic} onClick={toggleMenu} style={{ width: "50px", height: "50px" }} />
            </div>
        </div>
    )
}

export default Header

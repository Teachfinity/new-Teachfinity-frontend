import React from 'react'
import "../css/Sidebar.css" ;

import SchoolIcon from '@material-ui/icons/School';
import MessageIcon from '@material-ui/icons/Message';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import DateRangeIcon from '@material-ui/icons/DateRange';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import {useHistory} from "react-router-dom" ;

function Sidebar() {
    const history = useHistory() ;
    return (
        <div className="sidebar">
            
            <div className="sidebar__button" onClick={() => history.push("/myclasses")} ><SchoolIcon /><p>My Classes</p></div>
            <div className="sidebar__button" onClick={() => history.push("/chats")} ><MessageIcon /><p>Chat</p></div>
            <div className="sidebar__button" ><LocalLibraryIcon /><p>Diary</p></div>
            <div className="sidebar__button" onClick={() => history.push("/timetable")} ><DateRangeIcon /><p>Timetable</p></div>
            <div className="sidebar__button" ><BookmarksIcon /><p>Bookmarks</p></div>
            
           
            
        </div>
    )
}

export default Sidebar

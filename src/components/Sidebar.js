import React, { useState } from 'react'
import "../css/Sidebar.css" ;

import SchoolIcon from '@material-ui/icons/School';
import MessageIcon from '@material-ui/icons/Message';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import DateRangeIcon from '@material-ui/icons/DateRange';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import {useHistory} from "react-router-dom" ;

function Sidebar() {
    const history = useHistory() ;
    const [main, setMain] = useState(true)
    const [chat, setChat] = useState(false)
    const [diary, setDiary] = useState(false)
    const [timetable, setTimetable] = useState(false)
    const [bookmarks, setBookmarks] = useState(false)

    const Classes = ()=>{
        history.push("/myclasses")
        setMain(true)
        setChat(false)
        setDiary(false)
        setTimetable(false)
        setBookmarks(false)
    }
    const Chat = ()=>{
        history.push("/chats")
        setMain(false)
        setChat(true)
        setDiary(false)
        setTimetable(false)
        setBookmarks(false)
    }
    const Diary = ()=>{
        //history.push("/chats")
        setMain(false)
        setChat(false)
        setDiary(true)
        setTimetable(false)
        setBookmarks(false)
    }
    const Timetable = ()=>{
        history.push("/timetable")
        setMain(false)
        setChat(false)
        setDiary(false)
        setTimetable(true)
        setBookmarks(false)
    }
    const Bookmarks = ()=>{
        //history.push("/chats")
        setMain(false)
        setChat(false)
        setDiary(false)
        setTimetable(false)
        setBookmarks(true)
    }

    return (
        <div className="sidebar">
            
            {main? <div className="sidebar__button__active" onClick={Classes}><SchoolIcon /><p>My Classes</p></div> : <div className="sidebar__button" onClick={Classes}><SchoolIcon /><p>My Classes</p></div>}
            {chat? <div className="sidebar__button__active" ><MessageIcon /><p>Chat</p></div>:<div className="sidebar__button" onClick={Chat} ><MessageIcon /><p>Chat</p></div> }
            {diary? <div className="sidebar__button__active" ><LocalLibraryIcon /><p>Diary</p></div>:<div className="sidebar__button" ><LocalLibraryIcon /><p>Diary</p></div>}
            {timetable? <div className="sidebar__button__active" ><DateRangeIcon /><p>Timetable</p></div>:<div className="sidebar__button" onClick={Timetable} ><DateRangeIcon /><p>Timetable</p></div>}
            {bookmarks? <div className="sidebar__button__active" ><BookmarksIcon /><p>Bookmarks</p></div>:<div className="sidebar__button" ><BookmarksIcon /><p>Bookmarks</p></div>}
            
        </div>
    )
}

export default Sidebar

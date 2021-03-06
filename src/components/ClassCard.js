import React from 'react'
import "../css/ClassCard.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addClass } from "../features/selectClassSlice";
import { newClass } from "../features/myClassListSlice";
import { StarBorder, Star, MoreVert } from '@material-ui/icons';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import { selectUser } from "../features/userSlice";
import axios from 'axios'
function ClassCard({ title, description, id, code }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(selectUser);
    /* Function That will dispatch data into redux */
    const openClass = () => {
        dispatch(addClass({ title, description, id, code }));
        history.push("/classData")
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteClass = (id) => {
        axios.get("http://localhost:5000/classes/getstudents/class/" + id)
            .then((res) => {
                //Remove this class from students classes enrolled
                res.data.map((student) => {
                    axios.put("http://localhost:5000/users/updateuser/" + student.sid.uid + "/removeclassjoined/" + id)
                })
            })
            .then(() => {
                //Delete all meetings in this Class
                axios.delete("http://localhost:5000/meetings/delmeeting/class/" + id)
                    .then(() => {
                        //Delete all Posts in this Class
                        axios.delete("http://localhost:5000/posts/delpost/class/" + id)
                            .then(() => {
                                //Remove classes owned
                                axios.put("http://localhost:5000/users/updateuser/" + user.uid + "/removeclassowned/" + id)
                                    .then(() => {
                                        //Delete Class
                                        axios.delete("http://localhost:5000/classes/delclass/" + id)
                                            .then(() => {
                                                dispatch(newClass())
                                            })
                                            .catch(err => alert("Error says " + err))
                                    })
                                    .catch(err => alert("Error says " + err))
                            })
                            .catch(err => alert("Error says " + err))
                    })
                    .catch(err => alert("Error says " + err))
            })
            .catch(err => alert("Error says " + err))
        handleClose()
    }
    return (
        <div className="classCard">
            <div className="more_icon" >
                <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    className="iconButton"
                    onClick={handleClick}
                >
                    <MoreVert />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem>Edit Class</MenuItem>
                    <MenuItem onClick={() => deleteClass(id)}>Delete Class</MenuItem>
                </Menu>
            </div>
            <div onClick={openClass}>
                <div align="center">
                    <div className="classCard__logo">
                        <p>{title.charAt(0).toUpperCase()}</p>
                    </div>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default ClassCard

import React from 'react'
import "../../../css/ClassCard.css";
import {useSelector , useDispatch} from "react-redux" ;
import {selectedClass} from "../../../features/selectClassSlice" ;
import { newAssignment } from '../../../features/createAssignmentSlice';
import { StarBorder, Star, MoreVert } from '@material-ui/icons';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import axios from 'axios';
import {toast} from 'react-toastify';


function AssignmentCard({id, title}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const selectClass = useSelector(selectedClass);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const successNotify = () =>{
        toast.success("Assignment Deleted Successfully" ,
        {
            position: toast.POSITION.TOP_RIGHT,
        })
    }

    const deleteAssignment = (aid) => {
         axios.put("http://localhost:5000/classes/updateclass/"+selectClass.id+"/removeassignment/"+ aid)
            .then(() => {
                axios.delete("http://localhost:5000/assignments/delassignment/"+aid)
            })
            .then(()=>{
                setTimeout(()=>{
                    dispatch(newAssignment())
                },5000)
                successNotify()
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
                    <MenuItem>Edit Assignment</MenuItem>
                    <MenuItem onClick={() => deleteAssignment(id)}>Delete Assignment</MenuItem>
                </Menu>
            </div>
            <div>
                <div align="center">
                    <div className="classCard__logo">
                        <p>{title.charAt(0).toUpperCase()}</p>
                    </div>
                </div>
                <h3>{title}</h3>
            </div>
        </div>
    )
}

export default AssignmentCard

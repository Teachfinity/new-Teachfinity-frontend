import React, {useEffect, useState} from 'react'
import {useSelector , useDispatch} from "react-redux" ;
import { useHistory } from "react-router-dom";
import {selectedClass} from "../../../features/selectClassSlice" ;
import { StarBorder, Star, MoreVert } from '@material-ui/icons';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import { addQuiz } from "../../../features/selectedQuizSlice";
import { newPost } from "../../../features/postListSlice";
import {toast} from 'react-toastify';
import axios from 'axios'

function QuizCard({id, title}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const selectClass = useSelector(selectedClass) ;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [neww, setNew] = useState(false)
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const successNotify = () =>{
        toast.success("Quiz Deleted Successfully" ,
        {
            position: toast.POSITION.TOP_RIGHT,
        })
    }
    const deleteQuiz = (id) => {
        axios.put("http://localhost:5000/classes/updateclass/"+selectClass.id+"/removequiz/"+ id)
        .then(() => {
            axios.delete("http://localhost:5000/quizzes/delquiz/"+id)
        })
        .then(()=>{
            setTimeout(()=>{
                dispatch(newPost())
            },5000)
            successNotify()
        })
        .catch(err => alert("Error says " + err))
        handleClose() 
    }
    const view = (qid) => {
        dispatch(addQuiz({qid}));
        history.push("/classData/classCabinet/myquizzes/viewsubmissions")
    }
    useEffect(()=>{
        setNew(false)
        console.log("updated")
    },[neww])

    return (
        <div >
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
                    <MenuItem onClick={() => deleteQuiz(id)}>Delete Quiz</MenuItem>
                </Menu>
            </div>
            <div>
                <div onClick={()=>view(id)} align="center">
                    <div className="classCard__logo">
                        <p>{title.charAt(0).toUpperCase()}</p>
                    </div>
                </div>
                <h3>{title}</h3>
            </div>
        </div>
        </div>
    )
}

export default QuizCard

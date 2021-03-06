import React from 'react'
import { useEffect, useState } from 'react';
import {useSelector , useDispatch} from "react-redux" ;
import {selectUser} from "../features/userSlice" ;
import {addclassesEnrolled} from "../features/classesEnrolledSlice" ;
import axios from "axios";
import "../css/JoinClassCard.css" ;
import { FormatListNumberedRtlRounded } from '@material-ui/icons';
function JoinClassCard({icon , title , description}) {
    const dispatch = useDispatch() ;
    const user = useSelector(selectUser) ;
    const [code, setCode] = useState("");
    var students = [];
    var getclass = null;
    var curruser = null;
    var teacher = null;
    var studentFound = false
    var classname = null;
    var classdesc = null

    const handleSubmit = () =>{
        axios.get("http://localhost:5000/classes/getclasses/code/"+code)
        .then((res)=>{
            if(res.data.length===0){
                alert("Invalid Code")
            }
            else{
            setCode("")
            teacher = res.data[0].teacher
            students = res.data[0].students
            getclass = res.data[0]._id
            classname = res.data[0].name
            classdesc = res.data[0].description

            axios.get("http://localhost:5000/users/getusers/"+user.uid)
            .then((res) => {
                curruser = res.data[0]._id
                if(teacher===curruser){
                    alert("You are already the admin of this class")
                }
                else{
                    console.log(students)
                    students.map((student)=> {
                        console.log("here")
                        if(student.sid===curruser){
                            studentFound = true
                        }
                    })
                    if(studentFound){
                        alert("You have already Joined this class")
                    }
                    else{
                        dispatch(addclassesEnrolled({ name: classname, description: classdesc}));
                        axios.put("http://localhost:5000/classes/updateclass/"+getclass+"/student/"+curruser)
                        .then(() =>{
                            axios.put("http://localhost:5000/users/updateuser/"+user.uid+"/classroomsJoined/"+getclass)
                        })
                        .then(()=>{
                            alert("Class Joined Successfully")
                        })
                        .catch(err => alert(err))
                    } 
                }
            })
        }
        })
        .catch(err => alert(err))  
    }
    return (
        <div className="joinClass">
            <img src={icon} alt="" />
            <div className="joinClass__title">
                <p>{title}</p>
            </div>
            <div className="joinClass__description">
                <p>{description}</p>
            </div>
            <input value={code} onChange={event=>setCode(event.target.value)} placeholder="Enter code here..." />
            <button onClick={() => {handleSubmit()}}>Join Class</button>

        </div>
    )
}

export default JoinClassCard

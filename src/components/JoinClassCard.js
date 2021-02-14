import React from 'react'
import { useEffect, useState } from 'react';
import {useSelector , useDispatch} from "react-redux" ;
import {selectUser} from "../features/userSlice" ;
import {addclassesEnrolled} from "../features/classesEnrolledSlice" ;
import axios from "axios";
import "../css/JoinClassCard.css" ;
function JoinClassCard({icon , title , description}) {
    const dispatch = useDispatch() ;
    const user = useSelector(selectUser) ;
    const [code, setCode] = useState("")
    var getclass = null;
    var curruser = null;

    const handleSubmit = () =>{
        axios.get("http://localhost:5000/classes/getclasses/code/"+code)
        .then((res) => {
            getclass = res.data[0]._id
            dispatch(addclassesEnrolled({ name: res.data[0].name, description: res.data[0].description}));
        })
        .then(() => {
            axios.get("http://localhost:5000/users/getusers/"+user.uid)
            .then((res) => {
                curruser = res.data[0]._id
            })
            .then(() =>{
            axios.put("http://localhost:5000/classes/updateclass/"+getclass+"/student/"+curruser)
            .then(() =>{
                axios.put("http://localhost:5000/users/updateuser/"+user.uid+"/classroomsJoined/"+getclass)
            }).catch(err => alert(err))
            }).catch(err => alert(err))
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
            <input onChange={event=>setCode(event.target.value)} placeholder="Enter code here..." />
            <button onClick={() => {handleSubmit()}}>Join Class</button>

        </div>
    )
}

export default JoinClassCard

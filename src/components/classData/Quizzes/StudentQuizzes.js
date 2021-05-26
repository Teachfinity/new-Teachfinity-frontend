import React, {useEffect, useState, useRef} from 'react'
import {useSelector , useDispatch} from "react-redux" ;
import "../../../css/ClassCabinetAssignments.css"
import {selectedClass} from "../../../features/selectClassSlice" ;
import axios from "axios" ;
import Quiz from './Quiz';

function StudentQuizzes() {
    const selectClass = useSelector(selectedClass) ;
    const [quizList, setQuizList] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:5000/quizzes/getquizzes/class/"+selectClass.id)
        .then((res)=>{
            setQuizList(res.data)
        })
    }, [])

    return (
        <div >
        {quizList.length!==0?
           quizList.map((item)=>(
             <Quiz id={item._id} title={item.name} /> 
        ))
        :
        <>
        <p class="classFeed__noclasses">No Quizzes to Show</p>
        </>
        }
        </div>
    )
}

export default StudentQuizzes

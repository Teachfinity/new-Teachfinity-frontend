import React, {useEffect, useState} from 'react'
import {useSelector , useDispatch} from "react-redux" ;
import {selectedClass} from "../../../features/selectClassSlice" ;
import QuizCard from "./QuizCard";
import { newPost } from "../../../features/postListSlice";
import axios from 'axios'

function ClassCabinetQuizzes() {
    const selectClass = useSelector(selectedClass) ;
    const newwPost = useSelector(newPost) ;
    const [quizList, setQuizList] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:5000/quizzes/getquizzes/class/"+selectClass.id)
        .then((res)=>{
            setQuizList(res.data)
        })
    }, [newwPost])

    return (
        <div >
        {quizList.length!==0?
           quizList.map((item)=>(
             <QuizCard id={item._id} title={item.name} /> 
        ))
        :
        <>
        <p class="classFeed__noclasses">No Quizzes to Show</p>
        </>
        }
        </div>
    )
}

export default ClassCabinetQuizzes

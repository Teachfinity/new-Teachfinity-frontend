import React, {useEffect, useState} from 'react';
import {selectUser} from "../../../features/userSlice" ;
import { useSelector, useDispatch } from "react-redux";
import { selectedQuiz } from "../../../features/selectedQuizSlice";
import moment from 'moment'
import axios from 'axios'

function ViewQuiz() {
    const user = useSelector(selectUser) ;
    const Quiz = useSelector(selectedQuiz) ;
    const dispatch = useDispatch();
    const [title , setTitle] = useState("") ;
    const [dueTime , setDueTime] = useState() ;
    const [marks , setMarks] = useState() ;
    const [submitted , setSubmitted] = useState(false) ;
    const [questions , setQuestions] = useState([]) ;
    const [mcqs , setMCQS] = useState([]) ;
    const [answers , setAnswers] = useState([]) ;
    const [options , setOptions] = useState([]) ;

    const HandleChange = (event, index) =>{
        answers[index] = event.target.value
    }
    const select = (event, index) =>{
        options[index] = event.target.value
    }
    const Submit = () =>{
        var useri = null;
        axios.get("http://localhost:5000/users/getusers/"+user.uid)
        .then((res)=>{
            useri = res.data[0]._id
            const result = {
                "answers": answers,
                "mcqs": options
            }
            axios.put("http://localhost:5000/quizzes/updatequiz/"+Quiz.qid+"/student/"+useri+"/response", {"result": result})
            .then(()=>{
                setSubmitted(true)
            })
        })
    }
    useEffect(()=>{
        var useri = null;
        axios.get("http://localhost:5000/users/getusers/"+user.uid)
        .then((res)=>{
            useri = res.data[0]._id
            axios.get("http://localhost:5000/quizzes/getquiz/"+Quiz.qid)
            .then((res) => {
                console.log(res.data);
                setTitle(res.data.name)
                setDueTime(moment(res.data.time).format('hh:mm A'))
                setMarks(res.data.marks)
                setQuestions(res.data.questions)
                setMCQS(res.data.mcqs)
                res.data.students.map((id)=>{
                    if(id.sid===useri){
                        setSubmitted(true)
                    }
                })
        })
        .catch(err => alert("MY FEED SAYs" + err))  
        })
    }, [submitted])

    return (
        <div className="body">
            <div className="box">
                <div className="ccontainer">
                    {submitted?
                    <h1>Submitted!</h1>
                    :
                    <><h2>{title}</h2>
                    <p>Total Marks: {marks}</p>
                    <p>Due At: {dueTime}</p>
                    {questions.length!==0?
                        questions.map((item, index)=>(
                            <div>
                                <h2>Question {index+1}</h2>
                                <h3>{item}</h3>
                                <textarea onChange={event=>HandleChange(event, index)}></textarea>
                            </div>
                        ))
                        :
                        <>
                        </>
                    }
                    {mcqs.length!==0?
                        mcqs.map((item, index)=>(
                            <div>
                                <h2>MCQ {index+1}</h2>
                                <h3>{item.question}</h3>
                                <div>
                                {item.options.map((option)=>(
                                    <>
                                    <div style={{display: "flex"}}>
                                    <input onChange={event=>select(event, index)} value={option} type="radio"></input>
                                    <p>{option} </p>
                                    </div>
                                    </>
                                ))
                            }
                                </div>
                            </div>
                        ))
                        :
                        <>
                        </>
                    }
                    <button onClick={Submit}>Submit Quiz</button></>
                    }
                </div>
            </div>
        </div>
    )
}

export default ViewQuiz

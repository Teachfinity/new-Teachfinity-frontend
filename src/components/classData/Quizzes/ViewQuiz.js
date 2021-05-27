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
    const [dueDate , setDueDate] = useState() ;
    const [timer , setTimer] = useState() ;
    const [days , setDays] = useState() ;
    const [hours , setHours] = useState() ;
    const [minutes , setMinutes] = useState() ;
    const [sec , setSec] = useState() ;
    const [marks , setMarks] = useState() ;
    const [submitted , setSubmitted] = useState(false) ;
    const [questions , setQuestions] = useState([]) ;
    const [mcqs , setMCQS] = useState([]) ;
    const [answers , setAnswers] = useState([]) ;
    const [options , setOptions] = useState([]) ;
    const [pastDue, setPastDue] = useState(false); 
    var time = null;

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
                time = new Date(res.data.time).getTime()
                setTimer(time)
                setDueDate(moment(res.data.time).format('DD-MM-YYYY'))
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
    }, [submitted])
    
    setInterval(()=>{
        var now = Date.now()
        var distance = time - now
        setDays(Math.floor(distance/(1000*60*60*24)))
        setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
        setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)))
        setSec(Math.floor((distance % (1000 * 60)) / 1000))
        if(distance<0){
            setPastDue(true)
        }
    })  
    }, 1000)

    return (
        <div className="body">
            <div className="box">
                <div className="ccontainer">
                    {submitted?
                    <h1>Submitted!</h1>
                    :
                    <><h2>{title}</h2>
                    <p>Total Marks: {marks}</p>
                    <p>Due At: {dueDate} {dueTime}</p>
                    <p>Time Left: {days} d {hours} h {minutes} m {sec} s</p>
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
                    {!pastDue?
                    <button disabled='true'>Past Due</button>
                    :
                    <button onClick={Submit}>Submit Quiz</button>
                    }
                    </>
                    }
                </div>
            </div>
        </div>
    )
}

export default ViewQuiz

import React, {useEffect, useState} from 'react';
import {selectUser} from "../../../features/userSlice" ;
import { useSelector, useDispatch } from "react-redux";
import { selectedQuiz } from "../../../features/selectedQuizSlice";
import {selectedClass} from "../../../features/selectClassSlice" ;
import moment from 'moment'
import axios from 'axios'

function ViewSubmission() {
    const selectClass = useSelector(selectedClass) ;
    const Quiz = useSelector(selectedQuiz) ;
    const [sname , setSname] = useState([]) ;
    const [pending , setPending] = useState([]) ;
    const [student, setStudent] = useState([]) ;
    const [selected, setSelected] = useState([]) ;
    const [modal , setModal] = useState(false) ;
    const [title , setTitle] = useState("") ;
    const [marks , setMarks] = useState() ;
    const [questions , setQuestions] = useState([]) ;
    const [mcqs , setMCQS] = useState([]) ;
    const [answers, setAnswers] = useState([])
    const [options, setOptions] = useState([])
    const [correctoptions, setCorrectOptions] = useState([])
    const [obtainedMarks, setObtainedMarks] = useState()
    const [marked, setMarked] = useState(false)

    const openModal = (it) =>{
        setSelected(it.id)
        setAnswers([])
        setOptions([])
        axios.get("http://localhost:5000/quizzes/getquiz/"+Quiz.qid)
        .then((res)=>{
            console.log(res.data.mcqs)
            {res.data.mcqs.map((id)=>{
                correctoptions.push(id.correctoption)
            })}
            res.data.allMarks.map((id)=>{
                if(id.sid === it.id){
                    setObtainedMarks(id.marks)
                    setMarked(true)
                }
            })
            res.data.students.map((id)=>{
                if(id.sid === it.id){
                    setModal(true)
                    console.log(id.answer[0])
                    setAnswers(id.answer[0].answers)
                    setOptions(id.answer[0].mcqs)
                }
            })
        })
    }
    const gradeQuiz = () =>{ 
        axios.put('http://localhost:5000/quizzes/updatequiz/'+Quiz.qid+'/student/'+selected+'/marks/'+obtainedMarks)  
    }

    useEffect(() => {
        /* response for the assignments */
        setSname([])
        setPending([])
        axios.get("http://localhost:5000/classes/getstudents/class/"+selectClass.id)
        .then((res)=>{
            var ids = []
             res.data.map((id)=>{
                console.log(id.sid.name)
                var userid = id.sid._id
                var username = id.sid.name
                axios.get("http://localhost:5000/quizzes/getquiz/"+Quiz.qid)
                .then((res)=>{ 
                    console.log(res.data)
                    setTitle(res.data.name)
                    setMarks(res.data.marks)
                    setQuestions(res.data.questions)
                    setMCQS(res.data.mcqs)
                    res.data.students.map((id)=>{
                    if(ids.includes(id.sid)||ids.includes(userid)){
                        //do nothing
                    }
                    else{
                        if(id.sid===userid){
                        setSname(sname=> [...sname, {student: username, id: userid}])
                        student.push(username)
                        ids.push(userid)
                        } 
                    }   
                })
                if(!ids.includes(id.sid)&&!ids.includes(userid)){
                    setPending(pending => [...pending, username])
                    ids.push(userid)
                    } 
                }) 
                .catch(err => alert("MY FEED SAYs" + err))  
            }) 
        })
        .catch(err => alert("MY FEED SAYs" + err))  
        /* .then(()=>{
            setTimeout(() => {
                setBusy(false) ;
              }, 2000);
        })
        .catch(err => alert("MY FEED SAYs" + err))   */
        
    } , [marked])

    return (
        <div className="viewSubmissions" >
            <div className="viewSubmissions__heading">
                <hr></hr>
                <h1>Quiz Details</h1>
                <hr></hr>
            </div>
            <div className="viewSubmissions__submitted">
                <h1>
                    Submissions
                </h1>
                {sname.map((item)=>(
                <div className="viewSubmissions__submittedLI" onClick={() => {openModal(item)}}>
                    <div className="viewSubmissions__submittedLITop" >
                        <h2>{item.student}</h2>
                    </div>
                </div>
               ))}
                
                
            </div>
            <div className="viewSubmission__notSubmitted">
                <h1>
                    Pending submissions
                </h1>
                    {
                        pending.length > 0
                    ?
                    <ol>
                    {pending.map((item, index)=>(
                        <li>{item}</li>
                    ))}
                    </ol>
                    :
                        <h3>No pending submmissions</h3>
                    } 
            </div>
            {modal
                &&
                <div className="viewSubmissions__modal">
                    <div>
                        <button onClick={() => setModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                    <>
                    <h2>{title}</h2>
                    {marked?
                    <p>Marked {obtainedMarks}/{marks}</p>
                    :
                    <p>Total Marks: <input id="marksInput" onChange={event => setObtainedMarks(event.target.value)}/> / {marks} </p>
                    }
                        <div className="quizQuestionList" style={{display: "flex"}} >
                            {questions.length !== 0 ?
                                questions.map((item, index) => (
                                    <div className="quizQuestion" >
                                        <h3>Question {index + 1}</h3>
                                        <h4>{item}</h4>
                                        <div >{answers[index]}</div>
                                    </div>
                                ))
                                :
                                <>
                                </>
                            }
                        </div>
                        <div className="quizMCQList" >
                        {mcqs.length !== 0 ?
                            mcqs.map((item, index) => (
                                <div className="quizMCQ">
                                    <h3>MCQ {index + 1}</h3>
                                    <h4>{item.question}</h4>
                                    <div className='quizMCQOptionsList' >
                                        {item.options.map((option) => (
                                            <>
                                                <div className="quizMCQOption" style={{ display: "flex" }}>
                                                    {option === options[index] ?
                                                        <input style={{width: "10%" , height: "1rem"}} checked disabled type="radio"></input>  
                                                        :
                                                        <input style={{width: "10%" , height: "1rem"}} disabled type="radio"></input>
                                                    }
                                                    {option === options[index] ?
                                                        option === correctoptions[index]?
                                                        <p style={{backgroundColor: "#33A036" , padding: "0px 15px" , borderRadius: "5px" , color: "white"}}>{option}</p>
                                                        :
                                                        <p style={{backgroundColor: "#FD3F28" , padding: "0px 15px" , borderRadius: "5px", color: "white"}}>{option}</p>
                                                        :
                                                        <p style={{padding: "0px 15px"}}>{option}</p>
                                                    }
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
                        </div>
                    <div className="gradeQuiz">
                        <button onClick={gradeQuiz}
                        style={{backgroundColor: "#3aa5ab"}} >
                            Grade Quiz</button>
                    </div>
                        </>
                </div>
            }
        </div>
    )
}

export default ViewSubmission

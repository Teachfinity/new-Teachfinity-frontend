import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { addData, quizData } from "../../features/quizDataSlice";
import { useHistory } from "react-router-dom";
import CreateIcon from '@material-ui/icons/Create';
import "../../css/QuizEngine.css" 
import "../../css/QuizForm.css" 
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { selectMyClassList,  } from "../../features/myClassListSlice";
import CancelIcon from '@material-ui/icons/Cancel';
import SendIcon from '@material-ui/icons/Send';
import { selectUser } from "../../features/userSlice";
import { TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText, makeStyles } from '@material-ui/core'
import axios from "axios";
import {toast} from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function QuizForm() {
    
    const quiz = useSelector(quizData);
    const classes = useStyles();
    const history = useHistory();
    const [update,setUpdate]=useState(quiz.slice())
    const [newquestion, setQuestion] = useState(false)
    const [input, setInput] = useState('')
    const [option1, setOption1] = useState('')
    const [option2, setOption2] = useState('')
    const [option3, setOption3] = useState('')
    const [option4, setOption4] = useState('')
    const [correct, setCorrectOpt] = useState('')
    const [quizname, setQuizName] = useState('')
    const [marks, setQuizMarks] = useState('')
    const [Teacher, setTeacher] = useState('')
    const [time, setQuizTime] = useState()
    const [newmcq, setMCQ] = useState(false)
    const [mcqs, setMCQs] = useState(false)
    const [neww, setNew] = useState(false)
    const [classs, setClass] = useState();
    const [created, setCreated] = useState(false)
    const classList = useSelector(selectMyClassList);
    const user = useSelector(selectUser);

    
    const successNotify = () =>{
        toast.success("Quiz Created Successfully" ,
        {
            position: toast.POSITION.TOP_RIGHT,
        })
    }

    const sendToDB = (e) =>{
        e.preventDefault() ;
        const quest = []
        const mcq = []
        console.log(update)
        update.map(item=>{
            if(item.title!==undefined){
                quest.push(item.title)
            }
            else{
                mcq.push({question: item.MCQ, options: item.options, correctoption: item.correctOption})
            }
        })
        console.log(quest)
        console.log(mcq)
        const qdata = {
            "name": quizname,
            "marks": marks,
            "time": time,
            "teacher": Teacher,
            "class": classs,
            "questions": quest,
            "mcqs": mcq
        }
        console.log(qdata)
        axios.post("http://localhost:5000/quizzes/newquiz", qdata)
        .then((res)=>{
            console.log(res.data)
            setTimeout(()=>{
                history.push('/quiz')
            },5000)
            successNotify()
        })  
    }

    const updateQuestions = () =>{
        update.push({
            title: input,
        })
        setQuestion(false)
        setNew(true)
        //update p nai arha error kispe aitem.options pe
    }
    const updateMCQs = () =>{
        update.push({
            MCQ: input,
            options: [
                option1,
                option2,
                option3,
                option4
            ],
            correctOption: correct,
        }
        
        )
        console.log(update)
        setMCQ(false)
        setMCQs(true)
        setNew(true)
    }

    useEffect(()=>{
        setNew(false)
        axios.get("http://localhost:5000/users/getusers/"+user.uid)
        .then((res)=>{
            setTeacher(res.data[0]._id)
        })
    },[neww, created])

    return(
    <div className="body">
    <div className="box">
        <div className="ccontainer">
                <h1>Quiz Created!</h1>
                    :
                    <div className="quiz__details" >
                        <div>
                            <h2  >Enter Quiz Name: </h2>
                            <input id="quizname" required onChange={event => setQuizName(event.target.value)}></input>
                        </div>
                        <div>
                            <h2>Enter Total Marks: </h2>
                            <input id="quizmarks" required onChange={event => setQuizMarks(event.target.value)}></input>
                        </div>
                        <div>
                            <div id="quiztime">
                                <h2>Enter Time: </h2>
                                <input required onChange={event => setQuizTime(event.target.value)} type="datetime-local"></input>
                            </div>
                            <div id="quizclass">
                                {/* Here */}
                                <div className="event_classes">
                                    <FormControl required className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-required-label">Select Class</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-required-label"
                                            id="demo-simple-select-required"
                                            value={classs}
                                            onChange={event => setClass(event.target.value)}
                                            className={classes.selectEmpty}

                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {classList.map(item => (
                                                <MenuItem value={item.id}>{item.name}</MenuItem>
                                            )
                                            )}
                                        </Select>
                                        <FormHelperText>Required</FormHelperText>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </div>
         {update.map((item, index)=>(
             <div className="quizQuestionList" >
                 <h2>Question: {index + 1}</h2>
                 {item.title &&

                     <>

                         <p><strong>{item.title}</strong></p>
                        
                     </>
                 }
                 {mcqs ?
                     <>
                         <div>
                             <p><strong>{item.MCQ}</strong></p>
                             {item.options && item.options.map((item, index) => (
                                 <div id="mcqdisplay" >
                                     <input style={{width: "10%" , height: "1rem"}}  value={item} type="radio"></input>
                                     <h6>{item}</h6>
                                 </div>
                             ))
                             }
                         </div>
                     </>
                     :
                     <>
                     </>

                 }
             </div>
        ))}
        <div className="addQuestion" >
            <div>
            <AddCircleOutlineIcon onClick={()=>{setQuestion(true); setMCQ(false)}}></AddCircleOutlineIcon>
            <label>Add Question</label>
            </div>
            <div>
            <AddCircleOutlineIcon onClick={()=>{setQuestion(false); setMCQ(true)}}></AddCircleOutlineIcon>
            <label>Add MCQ</label>
            </div>
        </div>
        {newquestion?
            <div className="newQuestionForm" >
                <input onChange={event=>setInput(event.target.value)} placeholder="Add new Question..."></input>
                <div>
                <SendIcon style={{"cursor" : "pointer"}} onClick={updateQuestions}></SendIcon>
                <CancelIcon style={{"cursor" : "pointer" , "color" : "red"}} onClick={()=>{setQuestion(false); setMCQ(false)}}></CancelIcon>
                </div>
            </div>
            :
            <p></p>
        }
        {newmcq?
                        <div className="newMCQForm" >
                            <input onChange={event => setInput(event.target.value)} placeholder="Enter MCQ Question..."></input>
                            <div>
                                <input style={{width: "100%" , height: "1rem"}} disabled type="radio"></input>
                                <input id="mcqOption" onChange={event => setOption1(event.target.value)} placeholder="Enter Option..."></input>
                            </div>
                            <div>
                                <input style={{width: "100%" , height: "1rem"}} disabled type="radio"></input>
                                <input id="mcqOption" onChange={event => setOption2(event.target.value)} placeholder="Enter Option..."></input>
                            </div>
                            <div>
                                <input style={{width: "100%" , height: "1rem"}} disabled type="radio"></input>
                                <input id="mcqOption" onChange={event => setOption3(event.target.value)} placeholder="Enter Option..."></input>
                            </div>
                            <div>
                                <input style={{width: "100%" , height: "1rem"}} disabled type="radio"></input>
                                <input id="mcqOption" onChange={event => setOption4(event.target.value)} placeholder="Enter Option..."></input>
                            </div>
                            <div id="correctAnswer" >
                                <input onChange={event => setCorrectOpt(event.target.value)} placeholder="Correct Answer"></input>
                                <div>
                                <SendIcon  style={{"cursor" : "pointer"}} onClick={updateMCQs}></SendIcon>
                                <CancelIcon style={{"cursor" : "pointer" , "color" : "red"}} onClick={() => { setQuestion(false); setMCQ(false) }}></CancelIcon>
                                </div>
                            </div>
                        </div>
            :
            <p></p>
        }
        
        <button type="submit" className="cover-button" style={{marginTop: "30px"}} onClick={sendToDB}>Create Quiz</button>
    
        </div>
    </div>
    </div>
    )
}

export default QuizForm
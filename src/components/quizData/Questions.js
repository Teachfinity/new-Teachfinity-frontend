import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { addData, quizData } from "../../features/quizDataSlice";
import { useHistory } from "react-router-dom";
import CreateIcon from '@material-ui/icons/Create';
import "../../css/QuizEngine.css" 
import "../../css/Questions.css" 
import * as Survey from "survey-react";
import axios from "axios";

function Questions() {
    
    var quiz = useSelector(quizData);
    // let update = quiz.questions.slice()
    const history = useHistory();
    const [update,setUpdate]=useState(quiz.questions.slice())
    const [isEdit, setEdit] = useState(false)
    const [text, setText] = useState("")
    const [key, setKey] = useState()
    const dispatch = useDispatch();
    const [selected, setSelected] = useState([])
    const [tem, setemp] = useState(false)
    const [jsonQuestions,setJsonQuestions]=useState([])

    const updateDb =()=>{
        dispatch(addData(jsonQuestions))
        history.push("/quiz/generatequestions/questions/form")
    }

    const editQuestion = (item, index) =>{
        setEdit(true)
        setText(item)
        setKey(index)
    }
    const EditText = () =>{
        update[key] = text
        // setUpdate()
        setEdit(false)
        console.log(update)
    }
    const Selected = (index) =>{
        if(selected.includes(index)){
            const ind = selected.indexOf(index)
            selected.splice(ind, 1)
        }
        else{
            // setSelected(index)
            selected.push(index)
        
        }
        console.log(selected)   
    }
    const sendQuestions = () =>{
        console.log(selected)
        selected.map((item,index)=>{
            jsonQuestions.push({
                title: update[item],
            })
        })
        console.log(jsonQuestions);
        updateDb()
        
    }

    useEffect(()=>{
        console.log("Updated");
        setemp(!tem);
    },[update])

    return(
    <div className="body">
    <div className="qbox">
            <div className="qcontainer">
                <h4>Original Text</h4>
                <p>{quiz.original}</p>
            </div>
            <div className="cards">
                {update.map((items, index)=>(
                    <div className="card-body">
                        <div className="card-body-options">
                            <CreateIcon onClick={() => editQuestion(items, index)} className="edit__question"></CreateIcon>
                            <input type="checkbox" onClick={() => Selected(index)}></input>
                        </div>
                        <p className="card-text">{items}</p>
                    </div>
                ))}
            </div>
            <div>
                <button onClick={()=>sendQuestions()} className="cover-button" >Make Quiz</button>
            </div>
            {isEdit
            &&
            <div className="edit__modal">
                <div>
                    <button className="cross__button" onClick={() => setEdit(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                    <div className="etextArea">
                        <textarea value={text} onChange={e => setText(e.target.value)} className="esample-text">
                        </textarea>
                    </div>
                    <button onClick={EditText} className="scover-button">EditQuestion</button>
                </div>
            </div>
            }
    </div>
    
    </div>
    )
}

export default Questions
import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { addData, quizData } from "../../features/quizDataSlice";
import CreateIcon from '@material-ui/icons/Create';
import "../../css/QuizEngine.css" 
import "../../css/Questions.css" 
import * as Survey from "survey-react";
import axios from "axios";

let json = {
    questions: [
      {
       type: "checkbox",
       name: "car",
       title: "What car are you driving?",
       isRequired: true,
       hasSelectAll: true,
       hasNone: true,
       noneText: "None of the above",
       colCount: 4,
       choicesOrder: "asc",
       choices: [
        "Ford",
        "Tesla",
        "Vauxhall",
        "Volkswagen",
       ]
      },
      {
          type: "comment",
          name: "car",
          title: "What car are you driving?",
          isRequired: true,
         },
    ]
  }

function Questions() {
    
    var quiz = useSelector(quizData);
    // let update = quiz.questions.slice()
    const [update,setUpdate]=useState(quiz.questions.slice())
    const [isEdit, setEdit] = useState(false)
    const [text, setText] = useState("")
    const [key, setKey] = useState()
    const [selected, setSelected] = useState([])
    const [tem, setemp] = useState(false)
    const [jsonQuestions,setJsonQuestions]=useState([])

    const updateDb =()=>{
    axios.post("http://localhost:5000/survey/create",jsonQuestions)
    .then(res=>{console.log(res)})
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
                type: "comment",
                name: "question"+index,
                title: update[item],
                isRequired: true,
               })
        })
        console.log(jsonQuestions);
        updateDb()
        
    }

const createSurveyObject = ()=>{

}

    useEffect(()=>{
        console.log("Updated");
        setemp(!tem);
    },[update])

    return(
    <div className="body">
        <div className="survey">
        <Survey.Survey
          style={{backgroundColor:"silver"}}
          json={json}
          showCompletedPage={false}
        
        //   onComplete={this.onCompleteComponent}
        //   css={{ root: "sv_main sv_default_css " + rootClass }}
        />
        </div>
    <div className="qbox">
            <div className="qcontainer">
                <h4>Original Text</h4>
                <p>{quiz.original}</p>
            </div>
            <div className="cards">
                {update.map((items, index)=>(
                        <div className="card-body">
                            <CreateIcon onClick={()=>editQuestion(items, index)} className="edit__question"></CreateIcon>
                            <input type="checkbox" onClick={()=>Selected(index)}></input>
                            <p className="card-text">{items}</p>
                        </div>
                ))}
            </div>
            <div>
                <button onClick={()=>sendQuestions()}>Make Quiz</button>
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
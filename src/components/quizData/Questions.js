import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { addData, quizData } from "../../features/quizDataSlice";
import "../../css/QuizEngine.css" 
import "../../css/Questions.css" 

function Questions() {
    
    const quiz = useSelector(quizData);

    return(
    <div className="body">
    <div className="qbox">
            <div className="qcontainer">
                <h4>Original Text</h4>
                <p>{quiz.original}</p>
            </div>
            <div className="cards">
                {quiz.questions.map((items)=>(
                        <div className="card-body">
                            <p className="card-text">{items}</p>
                        </div>
                ))}
            </div>
    </div>
    </div>
    )
}

export default Questions
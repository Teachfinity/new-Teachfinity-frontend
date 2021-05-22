import React from 'react'
import { useHistory } from "react-router-dom";
import "../../css/QuizEngine.css" 

function QuizEngine() {

    const history = useHistory();

    return(
    <div className="body">
    <div className="box">
            <div className="triviatime">
            <img src="https://media3.giphy.com/media/JtM4TBYqkCIAoIzsqt/giphy.gif"></img>
            <button className="cover-button" onClick={()=>history.push("/quiz/generatequestions")}>Generate Quiz</button>
            </div>
    </div>
    </div>
    )
}

export default QuizEngine
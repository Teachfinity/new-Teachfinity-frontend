import React from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz } from "../../../features/selectedQuizSlice";
import "../../../css/Assignment.css";

function Assignments({id, title}) {
    
    const history = useHistory();
    const dispatch = useDispatch();

    const openQuiz = (qid) => {
        dispatch(addQuiz({qid}));
        history.push("/classData/classCabinet/studentquiz/viewQuiz")
    }
    return (
        <div onClick={()=>openQuiz(id)} className="assignments">
            <div className="assignment">
                <div>
                    <div className="assignment__logo">
                        <p>{title.charAt(0).toUpperCase()}</p>
                    </div>
                    <h3>{title}</h3>
                </div>
            </div>
        </div>
    )
}

export default Assignments

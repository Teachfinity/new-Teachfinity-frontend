import React from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment } from "../../../features/selectedAssignmentSlice";
import "../../../css/Assignment.css";

function Assignments({id, aid, title, instructions, duetime, marks}) {
    
    const history = useHistory();
    const dispatch = useDispatch();

    const openAssignment = (aid) => {
        dispatch(addAssignment({aid}));
        history.push("/classData/classCabinet/studentassignments/viewAssignment")
    }
    return (
        <div onClick={()=>openAssignment(aid)} className="assignments">
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

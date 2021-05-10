import React from 'react';
import { useHistory } from "react-router-dom";
import "../../../css/Assignment.css";

function Assignments({id, title, instructions, duetime, marks}) {
    
    const history = useHistory();

    const openAssignment = () => {
        history.push("/viewassignment")
    }
    return (
        <div onClick={openAssignment} className="assignments">
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

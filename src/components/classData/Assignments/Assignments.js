import React from 'react';
import "../../../css/Assignment.css";

function Assignments({id, title, instructions, duetime, marks}) {
    return (
        <div className="assignments">
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
